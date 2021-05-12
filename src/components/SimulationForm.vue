<template>
  <v-form>
    <v-row>
      <h1>Total people Infected: {{ infectNum }}</h1>
    </v-row>
    <v-row>
      <h1>Total locations Infected: {{ infectLocationNum }}</h1>
    </v-row>
    <v-row>
      <h1>Day: {{ this.$store.state.days }}</h1>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-btn color="green" @click="dump"> Dump data</v-btn>
      </v-col>
      <v-col cols="10">
        <v-btn color="red" @click="deleteDump"> Delete data</v-btn>
      </v-col>
    </v-row>
    <br />
    <br />
    <br />
    <v-row v-if="!this.$store.state.init">
      <v-col cols="8">
        <v-slider
          v-model="rangeValue"
          :label="rangeInput.label"
          :thumb-color="rangeInput.color"
          :min="min"
          :max="max"
          thumb-label="always"
        >
          <template v-slot:append>
            <v-text-field
              v-model="rangeValue"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
      <v-col cols="4">
        <v-btn color="primary" @click="initInfect">Infect</v-btn>
      </v-col>
    </v-row>
    <v-row> <v-btn color="grey" @click="daily">Daily advance</v-btn> </v-row>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      rangeInput: {
        label: "Number of init infected people",
        color: "red",
      },
      rangeValue: 0,
      min: 0,
      max: 1000,
      infectNum: 0,
      infectLocationNum: 0,
      infectedPeople: [],
      infectedLocations: [],
    };
  },

  async beforeMount() {
    await this.getInfectedNum();
    await this.getInfectedLocationNum();
    await this.getInfectedPeople();
  },

  methods: {
    async dump() {
      try {
        await axios({
          method: "post",
          url: "http://localhost:4000/dump",
          headers: {},
        });
        alert("Data successfuly dumped");
      } catch (err) {
        console.error(err);
      }
    },
    async deleteDump() {
      try {
        await axios({
          method: "delete",
          url: "http://localhost:4000/dump",
          headers: {},
        });
        alert("Data successfuly deleted");
        await this.getInfectedNum();
        await this.getInfectedLocationNum();
        this.$store.commit("resetDays");
        this.$store.commit("changeInit", !this.$store.state.init);
      } catch (err) {
        console.error(err);
      }
    },

    async getInfectedLocationNum() {
      try {
        this.infectLocationNum = (
          await axios({
            method: "get",
            url: "http://localhost:4000/location/infected",
            headers: {},
          })
        ).data.total;
      } catch (err) {
        console.error(err);
      }
    },

    async getInfectedNum() {
      try {
        const res = await axios({
          method: "get",
          url: "http://localhost:4000/person/infected",
          headers: {},
        });
        this.infectNum = res.data.total;
      } catch (err) {
        console.error(err);
      }
    },

    async initInfect() {
      try {
        await axios({
          method: "post",
          url: "http://localhost:4000/person/infect",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            infectNum: this.rangeValue,
          },
        });

        this.$store.commit("changeInit", !this.$store.state.init);
        await this.getInfectedNum();
      } catch (err) {
        console.error(err);
      }
    },
    async relatePeople() {
      await axios({
        method: "post",
        url: "http://localhost:4000/person/relate/location",
        headers: {},
      });
    },

    async infectLocation() {
      await axios({
        method: "post",
        url: "http://localhost:4000/location/infect",
        headers: {},
      });
    },

    async infectPersonInLocation() {
      await axios({
        method: "post",
        url: "http://localhost:4000/person/infect/visited",
        headers: {},
      });
    },

    async infectRelated() {
      await axios({
        method: "post",
        url: "http://localhost:4000/person/infect/related",
        headers: {},
      });
    },

    async deleteRelation() {
      await axios({
        method: "delete",
        url: "http://localhost:4000/person/relate/location",
        headers: {},
      });
    },

    async createData() {
      const tempPeople = this.infectedPeople.map((el) => el.dni);
      const tempLocations = this.infectedLocations.map((el) => el.zip_code);
      await this.getInfectedPeople();
      await this.getInfectedLocations();
      await axios({
        method: "post",
        url: "http://localhost:4000/analytics",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          day: this.$store.state.days,
          infected_locations_num: this.infectLocationNum,
          infected_locations: this.infectedLocations
            .map((el) => el.zip_code)
            .filter((el) => tempLocations.indexOf(el) === -1),
          infected_people_num: this.infectNum,
          infected_people: this.infectedPeople
            .map((el) => el.dni)
            .filter((el) => tempPeople.indexOf(el) === -1),
        },
      });
    },

    async getInfectedPeople() {
      try {
        const res = await axios({
          method: "get",
          url: "http://localhost:4000/person/infected",
          headers: {},
        });
        this.infectedPeople = res.data.records;
      } catch (err) {
        console.error(err);
      }
    },

    async getInfectedLocations() {
      try {
        this.infectedLocations = (
          await axios({
            method: "get",
            url: "http://localhost:4000/location/infected",
            headers: {},
          })
        ).data.records;
      } catch (err) {
        console.error(err);
      }
    },

    async daily() {
      try {
        await this.getInfectedPeople();
        await this.getInfectedLocations();
        await this.relatePeople();
        await this.infectLocation();
        await this.infectPersonInLocation();
        await this.infectRelated();
        await this.deleteRelation();
        await this.getInfectedNum();
        await this.getInfectedLocationNum();
        await this.createData();
        this.$store.commit("updateDays");
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

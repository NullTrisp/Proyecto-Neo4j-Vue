<template>
  <v-container>
    <v-card width="68em">
      <v-form>
        <v-card-text>
          <h1>Total people Infected: {{ infectNum }}</h1>
        </v-card-text>
        <v-card-text>
          <h1>Total locations Infected: {{ infectLocationNum }}</h1>
        </v-card-text>
        <v-card-text>
          <h1>Day: {{ this.$store.state.days }}</h1>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="dump"> Dump data</v-btn>
          <v-btn color="green" @click="dumpLite"> Dump lite data</v-btn>
          <v-btn color="red" @click="deleteDump"> Delete data</v-btn>
          <v-slider
            v-if="!this.$store.state.init"
            style="padding-right: 6em; padding-left: 6em"
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
          <v-btn
            v-if="!this.$store.state.init"
            color="primary"
            @click="initInfect"
            >Infect</v-btn
          >
          <v-btn color="grey" @click="daily">Daily advance</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <v-card width="68em" style="margin-top: 4em">
      <v-card-title> Basic data </v-card-title>
      <v-container>
        <v-row>
          <v-col>
            <h2>Total locations: {{ totalLocations }}</h2>
          </v-col>
          <v-col>
            <h2>Total locations infected: {{ infectLocationNum }}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>Total people: {{ totalPeople }}</h2>
          </v-col>
          <v-col>
            <h2>Total people infected: {{ infectNum }}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>People infection ratio: {{ infectPeopleRatio }}%</h2>
          </v-col>
          <v-col>
            <h2>Location infection ratio: {{ infectLocationRatio }}%</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>Day: {{ this.$store.state.days }}</h2>
          </v-col>
          <v-col v-if="data.lentgh === 0">
            <h2>
              Difference:
              {{
                data[data.length - 1].infected_locations_num -
                  data[data.length - 2].infected_locations_num
              }}
            </h2>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
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

      totalLocations: 0,
      totalPeople: 0,
      totalInfectedPeople: 0,
      data: [],
    };
  },

  async beforeMount() {
    try {
      await this.getInfectedNum();
      await this.getInfectedLocationNum();
      await this.getInfectedPeople();
      await this.refreshData();
    } catch (err) {
      console.error(err);
    }
  },

  computed: {
    infectPeopleRatio: function() {
      return Math.floor((this.infectNum / this.totalPeople) * 100);
    },
    infectLocationRatio: function() {
      return Math.floor((this.infectLocationNum / this.totalLocations) * 100);
    },
  },

  methods: {
    async dumpLite() {
      try {
        await axios({
          method: "post",
          url: "http://localhost:4000/dump",
          headers: {},
          data: {
            lite: true,
          },
        });
        alert("Data successfuly dumped");
        await this.refreshData();
      } catch (err) {
        console.error(err);
      }
    },
    async dump() {
      try {
        await axios({
          method: "post",
          url: "http://localhost:4000/dump",
          headers: {},
          data: {
            lite: false,
          },
        });
        alert("Data successfuly dumped");
        await this.refreshData();
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
        await this.refreshData();
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
        await this.refreshData();
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
        await this.refreshData();
        await this.updateGraphData();
      } catch (err) {
        console.error(err);
      }
    },

    async updateGraphData() {
      const res = (
        await axios({
          method: "get",
          url: "http://localhost:4000/analytics",
          headers: {},
        })
      ).data.records;

      this.$store.commit(
        "changeGraphData",
        res.map((el) => {
          return {
            label: "day " + (el.day.low + 1),
            value: el.infected_people_num.low,
          };
        })
      );
    },

    async refreshData() {
      await this.getTotalLocations();
      await this.getTotalPeople();
      await this.getData();
    },

    async getData() {
      const records = (
        await axios({
          method: "get",
          url: "http://localhost:4000/analytics",
          headers: {},
        })
      ).data.records;

      this.data.push(records[records.length - 2], records[records.length - 1]);
    },
    async getTotalLocations() {
      this.totalLocations = (
        await axios({
          method: "get",
          url: "http://localhost:4000/location",
          headers: {},
        })
      ).data.total;
    },
    async getTotalPeople() {
      this.totalPeople = (
        await axios({
          method: "get",
          url: "http://localhost:4000/person",
          headers: {},
        })
      ).data.total;
    },
  },
};
</script>

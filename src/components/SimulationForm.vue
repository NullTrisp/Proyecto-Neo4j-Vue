<template>
  <v-form>
    <v-row>
      <h1>Total Infected: {{ infectNum }}</h1>
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
    <v-row>
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
    };
  },

  async beforeMount() {
    this.getInfectedNum();
  },

  methods: {
    dump() {
      axios({
        method: "post",
        url: "http://localhost:4000/dump",
        headers: {},
      })
        .then(() => {
          alert("Data successfuly dumped");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    deleteDump() {
      axios({
        method: "delete",
        url: "http://localhost:4000/dump",
        headers: {},
      })
        .then(() => {
          alert("Data successfuly deleted");
          this.getInfectedNum();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getInfectedNum() {
      axios({
        method: "get",
        url: "http://localhost:4000/person/infected",
        headers: {},
      })
        .then((res) => {
          this.infectNum = res.data.total;
        })
        .catch((err) => {
          console.error(err);
        });
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

        setTimeout(() => {
          this.getInfectedNum();
        }, 800);
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

    async daily() {
      try {
        this.relatePeople();
        this.infectLocation();
        this.infectPersonInLocation();
        this.infectRelated();
        this.deleteRelation();
        this.getInfectedNum();
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
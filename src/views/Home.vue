<template>
  <div class="home">
    <h1 class="mt-4">Adam's Forge Rock To Do List</h1>
    <to-dos :config="config"/>
  </div>
</template>


<script>
// @ is an alias to /src
import ToDos from "@/views/to-dos.vue";
import * as Options from "../Config/settings.json";
import * as fs from "fs";

export default {
  name: "home",
  components: {
    ToDos
  },
  data() {
    return {config: Options.Priorities}
  }
};
</script>
<style>
    body {
        background-image: url("../assets/paper.jpg");
    }
</style>

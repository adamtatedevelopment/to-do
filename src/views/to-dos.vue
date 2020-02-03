<template>
<div>
  <div class="d-inline-block top-div mt-5">
  <input type="text" class="task-input"
  v-model="newItem.name"
   @keyup.enter="addItem"
   placeholder="New task">  
 </div>

<div class="d-inline-block ml-5">
<select class="w-100" v-model="newItem.priority.id">
  <option v-for="option in options" v-bind:value="option.id" :key="option.id">
    {{ option.name }}
  </option>
</select>
</div>

<div class="d-inline-block ml-5">
<button class="btn btn-primary w-100" @click="addItem" :disabled="!newItem.name.trim()">Add</button>
</div>

<div class>
<ul>
<div class="mt-5">
    <li v-for="(item, index) in toDoList" class="mt-5" :key="index">   
       
     <div class="check-b d-inline-block ml-5">
        <input
        type="checkbox"
        v-model="item.complete">
      </div>

      <div class="d-inline-block">
      <input class="ml-5" v-bind:class = "{ 'complete' : item.complete }" id ="todoEnter" type="text" v-model="item.name" :disabled="!item.edit">       
      </div>

      <div class="d-inline-block ml-5">
      <select class="ml-5 prior" v-model="item.priority.name" :selected="item.priority.name" :disabled="!item.edit">
        <option  v-for="option in options"
         v-bind:value="option.name"
        :key="option.id"
        :selected="option.name == item.priority.name">
        {{ option.name }}
      </option>     
      </select>  
      </div>

      <div class="d-inline-block">
      <button class="btn btn-primary ml-5 mt-2 row-btn" :disabled="(!item.name.trim())" @click="edit(index, item.edit)">{{ item.edit == true ? 'Save' : 'Edit' }}</button>
      </div>

      <button class="btn btn btn-danger ml-5 mt-2 row-btn" @click="removeItem(index)">Remove</button>
       
    </li>
</div>
</ul>
</div>

<div v-if="this.toDoList.length > 0">
  <button class="toolsbtn" @click="clearList">Clear List</button>
  <button @click="sortListAsc">&#x2193;</button>
  <button @click="sortListDesc">&#8593;</button>
</div>


</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ToDoItem } from "../models";
import { Priority } from "../models/to-do-item"
import * as _ from 'lodash';

@Component
export default class ToDos extends Vue {
  @Prop() private msg!: string;
  @Prop() private config! : any;
   newItem: ToDoItem = new ToDoItem();
   toDoList: Array<ToDoItem> = new Array<ToDoItem>();
   options : any = this.config;


    addItem() { 
    let mappedPriority = this.options.filter(x => x.id == this.newItem.priority.id)[0];
    
    let newItem = this.mapPriority();
    newItem.name = this.newItem.name;

    console.log(newItem);
    
    this.toDoList.push(newItem);
    this.newItem = new ToDoItem();

    this.newItem.priority.id = newItem.priority.id;
   }

   private mapPriority(){
     
    let newItem = new ToDoItem();
    let mappedPriority = this.options.filter(x => x.id == this.newItem.priority.id)[0];
    console.log(this.newItem.name);
    newItem.priority.id = mappedPriority.id;
    newItem.priority.name = mappedPriority.name;
    newItem.priority.rank = mappedPriority.rank;
    newItem.edit = false;
    newItem.complete = false;
    return newItem;
   }

   edit(index : number, editMode : boolean){
     this.toDoList[index].edit = !editMode; 

   }

    removeItem(index : number){
      this.toDoList.splice(index, 1);
    }

    clearList(){
      this.toDoList = [] as Array<ToDoItem>;
    }

    sortListAsc(){
      this.toDoList = _.orderBy(this.toDoList, ['priority.rank'], ['asc']);
    }

    sortListDesc(){
      this.toDoList = _.orderBy(this.toDoList, ['priority.rank'], ['desc']);
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li {
  font-size:12px;
  display: block;
  padding-left:20px;
  width:75%;
  padding-bottom: 10px;
}

.top-div{ 
  width:60%;
}

.w-12{
  width:6%;
}
input[type=checkbox]{
transform: scale(3);
}

@import url('https://fonts.googleapis.com/css?family=Cabin+Sketch&display=swap');
input[type=text] {
font-family: 'Cabin Sketch', cursive;
  font-size:3em;
  border: none;
  border-bottom: 2px solid orange;
  box-sizing:border-box;
  width:100%;
  background-color:transparent;
  

}
input[type=text]:focus {
     outline-width: 0;
}

#to-dos{
  margin-top:125px;
}

.row-btn{
  height:3em;
}

.complete {
    background-color: #fff2ac;
    background-image: linear-gradient(to right, #ffe359 0%, #fff2ac 100%);
}

.main{
  margin-top:75px;
}


.prior{
  font-size:15px;
}

</style>

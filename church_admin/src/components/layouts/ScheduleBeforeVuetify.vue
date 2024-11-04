<template>
    <div>
      <v-sheet class="d-flex" height="100%" tile>
        <q-btn @click="openDialog" text-color="white" label="Add New Schedule" />
        <q-btn-dropdown label="View" color="primary" class="dropdown">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Scheduled Requests</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Fr. Maglines</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Fr. Jerson</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </v-sheet>
      <v-sheet class="d-flex" height="100%" tile>
        <v-select v-model="type" :items="types" class="ma-2" label="View Mode" variant="outlined" dense hide-details></v-select>
        <v-select v-model="weekday" :items="weekdays" class="ma-2" label="weekdays" variant="outlined" dense hide-details></v-select>
      </v-sheet>
      <v-sheet class="calendar">
        <v-calendar ref="calendar" v-model="value" :events="events" :view-mode="type" :weekdays="weekday"></v-calendar>
      </v-sheet>
  
      <q-dialog v-model="dialogVisible">
        <q-card class="dialog">
          <q-card-section class="q-dialog-title">
            <q-card-title class="text-h6">Add New Schedule</q-card-title>
          </q-card-section>
          <q-card-section>
            <q-input v-model="schedule.title" label="Title" />
  
            <div class="input-wrapper">
              <div class="label">Start Date</div>
              <div class="date-picker">
                <q-input v-model="schedule.startDate" mask="date" outlined dense type="date">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer" />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="input-wrapper">
              <div class="label">Start Time</div>
              <div class="time-picker">
                <q-input v-model="schedule.startTime" mask="time" outlined dense type="time">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer" />
                  </template>
                </q-input>
              </div>
            </div>
  
            <div class="input-wrapper">
              <div class="label">End Date</div>
              <div class="date-picker">
                <q-input v-model="schedule.endDate" mask="date" outlined dense type="date">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer" />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="input-wrapper">
              <div class="label">End Time</div>
              <div class="time-picker">
                <q-input v-model="schedule.endTime" mask="time" outlined dense type="time">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Cancel" color="white" text-color = "black" @click="closeDialog" />
            <q-btn label="Add" text-color = "white" @click="saveSchedule" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script>
  import { VCalendar } from 'vuetify/labs/VCalendar'
  
  export default {
    components: {
      VCalendar,
    },
    data: () => ({
      type: 'month',
      types: ['month', 'week', 'day'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: [],
      events: [],
      dialogVisible: false,
      schedule: {
        title: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
      },
    }),
  
    methods: {
      openDialog() {
        this.dialogVisible = true;
      },
      closeDialog() {
        this.dialogVisible = false;
      },
      saveSchedule() {
        this.closeDialog();
      },
    },
  };
  </script>
  
  <style scoped>
  .q-btn {
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    background-color: #ffaa2b;
    color: black;
  }
  
  .dialog {
    width: 500px;
  }
  
  .q-dialog-title {
    background-color: #ffaa2b;
    color: white;
  }
  
  </style>
  
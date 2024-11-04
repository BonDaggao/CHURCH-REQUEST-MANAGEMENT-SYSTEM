<template>
  <div class="subcontent">
    <div class="button-container">
      <q-btn @click="openDialog" text-color="black" label="Add New Schedule" />
      <q-btn-dropdown label="View"  class="dropdown">
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
    </div>
    <div class="subcontent">
    
    <q-card style="margin-right: 10px; margin-left: 10px; margin-bottom: 10px; ">
      <navigation-bar
      @today="onToday"
      @prev="onPrev"
      @next="onNext"
    />
    <div class="row justify-center">
      <div style="display: flex; max-width: 10000px; width: 100%; margin-right: 5px; margin-left: 5px; margin-bottom: 5px;">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          animated
          bordered
          focusable
          hoverable
          no-active-date
          :day-min-height="80"
          :day-height="0"
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-day="onClickDay"
          @click-workweek="onClickWorkweek"
          @click-head-workweek="onClickHeadWorkweek"
          @click-head-day="onClickHeadDay"
        >
          <template #week="{ scope: { week, weekdays } }">
            <template
              v-for="(computedEvent, index) in getWeekEvents(week, weekdays)"
              :key="index"
            >
              <div
                :class="badgeClasses(computedEvent)"
                :style="badgeStyles(computedEvent, week.length)"
              >
                <div
                  v-if="computedEvent.event && computedEvent.event.details"
                  class="title q-calendar__ellipsis"
                >
                  {{ computedEvent.event.title + (computedEvent.event.time ? ' - ' + computedEvent.event.time : '') }}
                  <q-tooltip>{{ computedEvent.event.details }}</q-tooltip>
                </div>
              </div>
            </template>
          </template>
        </q-calendar-month>
      </div>
    </div>
    </q-card>
  </div>
    <q-dialog v-model="dialogVisible">
      <q-card class="dialog">
        <q-card-section class="q-dialog-title">
          <q-card-title class="text-h6">Add New Schedule</q-card-title>
        </q-card-section>
        <q-card-section>
          <q-input v-model="schedule.title" label="Title" />
          <q-input v-model="schedule.details" label="Details" />  
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
import {
  QCalendarMonth,
  daysBetween,
  isOverlappingDates,
  parsed,
  parseDate,
  today,
  indexOf
} from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'

import { defineComponent } from 'vue'
import NavigationBar from '../components/NavigationBar.vue'

// The function below is used to set up our demo data
const CURRENT_DAY = new Date()
function getCurrentDay (day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = parseDate(newDay)
  return tm.date
}

export default defineComponent({
  name: 'MonthSlotWeek',
  components: {
    NavigationBar,
    QCalendarMonth
  },
  data () {
    return {
      selectedDate: today(),
      dialogVisible: false,
      events: [
        {
          id: 1,
          title: '1st of the Month',
          details: 'Everything is funny as long as it is happening to someone else',
          start: getCurrentDay(1),
          end: getCurrentDay(1),
          bgcolor: 'orange'
        },
        {
          id: 2,
          title: 'Sisters Birthday',
          details: 'Buy a nice present',
          start: getCurrentDay(4),
          end: getCurrentDay(4),
          bgcolor: 'green',
          icon: 'fas fa-birthday-cake'
        },
        {
          id: 3,
          title: 'Meeting',
          details: 'Time to pitch my idea to the company',
          start: getCurrentDay(10),
          end: getCurrentDay(10),
          time: '10:00',
          duration: 120,
          bgcolor: 'red',
          icon: 'fas fa-handshake'
        },
        {
          id: 4,
          title: 'Lunch',
          details: 'Company is paying!',
          start: getCurrentDay(10),
          end: getCurrentDay(10),
          time: '11:30',
          duration: 90,
          bgcolor: 'teal',
          icon: 'fas fa-hamburger'
        },
        {
          id: 5,
          title: 'Visit mom',
          details: 'Always a nice chat with mom',
          start: getCurrentDay(20),
          end: getCurrentDay(20),
          time: '17:00',
          duration: 90,
          bgcolor: 'grey',
          icon: 'fas fa-car'
        },
        {
          id: 6,
          title: 'Conference',
          details: 'Teaching Javascript 101',
          start: getCurrentDay(22),
          end: getCurrentDay(22),
          time: '08:00',
          duration: 540,
          bgcolor: 'blue',
          icon: 'fas fa-chalkboard-teacher'
        },
        {
          id: 7,
          title: 'Girlfriend',
          details: 'Meet GF for dinner at Swanky Restaurant',
          start: getCurrentDay(22),
          end: getCurrentDay(22),
          time: '19:00',
          duration: 180,
          bgcolor: 'teal',
          icon: 'fas fa-utensils'
        },
        {
          id: 8,
          title: 'Rowing',
          details: 'Stay in shape!',
          start: getCurrentDay(27),
          end: getCurrentDay(28),
          bgcolor: 'purple',
          icon: 'rowing'
        },
        {
          id: 9,
          title: 'Fishing',
          details: 'Time for some weekend R&R',
          start: getCurrentDay(22),
          end: getCurrentDay(29),
          bgcolor: 'purple',
          icon: 'fas fa-fish'
        },
        {
          id: 10,
          title: 'Vacation',
          details: 'Trails and hikes, going camping! Don\'t forget to bring bear spray!',
          start: getCurrentDay(22),
          end: getCurrentDay(29),
          bgcolor: 'purple',
          icon: 'fas fa-plane'
        }
      ],
      schedule: {
      title: '',
      details: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: ''
    }
    }
  },
  methods: {
    getWeekEvents (week, weekdays) {
      const firstDay = parsed(week[ 0 ].date + ' 00:00')
      const lastDay = parsed(week[ week.length - 1 ].date + ' 23:59')

      const eventsWeek = []
      this.events.forEach((event, id) => {
        const startDate = parsed(event.start + ' 00:00')
        const endDate = parsed(event.end + ' 23:59')

        if (isOverlappingDates(startDate, endDate, firstDay, lastDay)) {
          const left = daysBetween(firstDay, startDate, true)
          const right = daysBetween(endDate, lastDay, true)

          eventsWeek.push({
            id, // index event
            left, // Position initial day [0-6]
            right, // Number days available
            size: week.length - (left + right), // Size current event (in days)
            event // Info
          })
        }
      })

      const events = []
      if (eventsWeek.length > 0) {
        const infoWeek = eventsWeek.sort((a, b) => a.left - b.left)
        infoWeek.forEach((_, i) => {
          this.insertEvent(events, week.length, infoWeek, i, 0, 0)
        })
      }

      return events
    },

    insertEvent (events, weekLength, infoWeek, index, availableDays, level) {
      const iEvent = infoWeek[ index ]
      if (iEvent !== undefined && iEvent.left >= availableDays) {
        // If you have space available, more events are placed
        if (iEvent.left - availableDays) {
          // It is filled with empty events
          events.push({ size: iEvent.left - availableDays })
        }
        // The event is built
        events.push({ size: iEvent.size, event: iEvent.event })

        if (level !== 0) {
          // If it goes into recursion, then the item is deleted
          infoWeek.splice(index, 1)
        }

        const currentAvailableDays = iEvent.left + iEvent.size

        if (currentAvailableDays < weekLength) {
          const indexNextEvent = indexOf(infoWeek, e => e.id !== iEvent.id && e.left >= currentAvailableDays)

          this.insertEvent(
            events,
            weekLength,
            infoWeek,
            indexNextEvent !== -1 ? indexNextEvent : index,
            currentAvailableDays,
            level + 1
          )
        } // else: There are no more days available, end of iteration
      }
      else {
        events.push({ size: weekLength - availableDays })
        // end of iteration
      }
    },

    badgeClasses (computedEvent) {
      if (computedEvent.event !== undefined) {
        return {
          'my-event': true,
          'text-white': true,
          [ `bg-${ computedEvent.event.bgcolor }` ]: true,
          'rounded-border': true,
          'q-calendar__ellipsis': true
        }
      }
      return {
        'my-void-event': true
      }
    },

    badgeStyles (computedEvent, weekLength) {
      const s = {}
      if (computedEvent.size !== undefined) {
        s.width = ((100 / weekLength) * computedEvent.size) + '%'
      }
      return s
    },

    isBetweenDatesWeek (dateStart, dateEnd, weekStart, weekEnd) {
      return (
        (dateEnd < weekEnd && dateEnd >= weekStart)
          || dateEnd === weekEnd
          || (dateEnd > weekEnd && dateStart <= weekEnd)
      )
    },

    onToday () {
      this.$refs.calendar.moveToToday()
    },
    onPrev () {
      this.$refs.calendar.prev()
    },
    onNext () {
      this.$refs.calendar.next()
    },
    onMoved (data) {
      console.log('onMoved', data)
    },
    onChange (data) {
      console.log('onChange', data)
    },
    onClickDate (data) {
      console.log('onClickDate', data)
    },
    onClickDay (data) {
      console.log('onClickDay', data)
    },
    onClickWorkweek (data) {
      console.log('onClickWorkweek', data)
    },
    onClickHeadDay (data) {
      console.log('onClickHeadDay', data)
    },
    onClickHeadWorkweek (data) {
      console.log('onClickHeadWorkweek', data)
    },
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    saveSchedule() {
      this.closeDialog();
    },
  }
})
</script>

<style scoped>

.button-container {
  display:inline-flex;
  margin-right: 10px;
}

.nav-button {
  background-color: white;
  margin-right: 10px;
  margin-left:10px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.calendar-wrapper {
  flex: 1;
}

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
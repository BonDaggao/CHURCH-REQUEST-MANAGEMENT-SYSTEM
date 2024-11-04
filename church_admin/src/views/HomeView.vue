<template>
  <div>
    <div class="top-space">
    <div class="flex-container">
    <q-card class="bar-chart" bordered>
      <div class="chart-text">Request Report</div>
      <div class="q-mb-md">
        <apexchart
          type="bar"
          :options="barChartOptions"
          :series="barChartSeries"
          :width="500"
        />
      </div>
    </q-card>

    <q-card class ="donut-chart" bordered>
      <div class="chart-text">Approved and Pending Requests</div>
        <div>
          <apexchart width="350" 
          type="donut" 
          :options="donutChartOptions" 
          :series="donutChartSeries">
        </apexchart>
      </div>
    </q-card>

    <q-card class="pie-chart" bordered>
      <div class="chart-text">Service Requests</div>
      <div class="q-mb-md">
        <apexchart
          type="pie"
          :options="pieChartOptions"
          :series="pieChartSeries"
          :width="500"
        />
      </div>
    </q-card>
</div>
</div>
<div class="cards-container">
    <q-card class = "cards" bordered>
    <q-card-section>
        <div class="text-subtitle2">Bpatism Request</div>
        <div class="req-num"> 15</div>
      </q-card-section>
    </q-card>

    <q-card class = "cards" bordered>
    <q-card-section>
        <div class="text-subtitle2">Marriage Request</div>
        <div class="req-num"> 15</div>
      </q-card-section>
    </q-card>

    <q-card class = "cards" bordered>
    <q-card-section>
        <div class="text-subtitle2">Confession Request</div>
        <div class="req-num"> 15</div>
      </q-card-section>
    </q-card>

    <q-card class = "cards" bordered>
    <q-card-section>
        <div class="text-subtitle2">Confirmation Request</div>
        <div class="req-num"> 15</div>
      </q-card-section>
    </q-card>
    
    <q-card class = "cards" bordered>
    <q-card-section>
        <div class="text-subtitle2">House Blessing Request</div>
        <div class="req-num"> 15</div>
      </q-card-section>
    </q-card>

    <q-card class = "cards" bordered>
    <q-card-section>
        <div class="text-subtitle2">Annointing of the Sick Request</div>
        <div class="req-num"> 15</div>
      </q-card-section>
    </q-card>   
  </div>
</div>

  <q-row>
    <q-col v-for="(service, index) in services" :key="index" cols="4">
      <q-card class="cards" bordered>
        <q-card-section>
          <div class="text-subtitle2">{{ service.name }}</div>
          <div class="req-num">{{ service.requests }}</div>
        </q-card-section>
      </q-card>
    </q-col>
  </q-row>
<div class="service-table-container">
  <div>
    <q-card class="service-table" bordered>
      <q-card-section>
        <div class="text-h6">Pending Document Requests</div>
      </q-card-section>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Member ID</th>
            <th class="text-right">Document Type</th>
            <th class="text-right"># of Copies</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
          </tr>
          <tr>
            <td class="text-left"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
          </tr>
          <tr>
            <td class="text-left"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
          </tr>
          <tr>
            <td class="text-left"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
          </tr>
          <tr>
            <td class="text-left"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
    <q-card class="service-table" bordered>
      <q-card-section>
        <div class="text-h6">Pending Service Requests</div>
      </q-card-section>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Member ID</th>
            <th class="text-right">Sercvice Type</th>
            <th class="text-right">Date</th>
            <th class="text-right">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
          </tr>
          <tr>
            <td class="text-left"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
          </tr>
          <tr>
            <td class="text-left"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
          </tr>
          <tr>
            <td class="text-left"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
          </tr>
          <tr>
            <td class="text-left"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
            <td class="text-right"></td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </div>
</div>
</template>


<script>

import VueApexCharts from 'vue3-apexcharts';


export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      barChartOptions: {
        chart: {
          id: 'bar-chart',
          dropShadow: {
            enabled: true,
            blur: 3,
            opacity: 0.2,
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
      },
      barChartSeries: [
        {
          name: 'Number of Requests',
          data: [30, 40, 45, 50, 60, 80, 10, 20, 40, 50, 70, 80],
        },
      ],
      pieChartOptions: {
        chart: {
          id: 'pie-chart',
          dropShadow: {
            enabled: true,
            blur: 3,
            opacity: 0.2,
          },
        },
        labels: ['Baptism', 'Marriage', 'Confession', 'Confirmation', 'Anointing of the Sick', 'House Blessing'],
      },
      pieChartSeries: [30, 20, 15, 10, 5, 20], 

      donutChartOptions: {
        chart: {
          id: 'donut-chart',
          dropShadow: {
            enabled: true,
            blur: 3,
            opacity: 0.2,
          },
        },
        labels: ['Pending', 'Approve'],
        legend: {
          show: false, 
        },
      },
      donutChartSeries: [20, 80],
    };
  },
};

</script>

<style>
.bar-chart{
  width: 520px;
  height: 340px
}
.pie-chart{
  width:520px;
  height: 340px
}

.donut-chart{
  width:340px;
  height: 340px
}

.chart-text{
  margin-left:10px;
  margin-top:5px
}
.cards{
  width:300px;
  height:100px;
  font: bold;
  margin-left:10px;
  margin-right:10px;
  display: inline-block;
}

.req-num{
  font-weight: bold;
  font-size: 30px
}

.cards-container {
  display: flex;
  justify-content: space-between; 
}

.my-card{
  width: 500px;
  height: 600px
  
}

.priest{
  font-size:20px
}

.flex-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.top-space {
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px
}

.service-table{
  width: 699px;
  height: 380px;
  margin-top: 20px;
  margin-left: 10px;
  margin-right:10px;
  margin-bottom: 10px;
  display: inline-block;
  justify-content: space-between; 
}

</style>
<!--
<template>
      <div class="col-3">
        <q-card class="q-mx-md" bordered>
          <div class="flex flex-center column">
            <q-circular-progress        
              font-size="12px"
              size="250px"
              :thickness="0.22"
              color="green-7"
              track-color="red-2"
              class="q-ma-md"
            >
            </q-circular-progress>
            <div>
              <q-badge color="green-2" rounded class="q-mr-sm" />Woman 40%
            </div>
            <div class="q-mb-xl">
              <q-badge color="green-7" rounded class="q-mr-sm" />Man 60%
            </div>
          </div>
        </q-card>
      </div>

      <div>
        <q-card>
          <
        </q-card>
      </div>
      <q-card class="q-mx-md" bordered>
    <q-slider v-model="activeChart" ticks="4" snap step="1" />
    <div v-if="chartData.length > 0">
      <apexchart
        v-if="activeChart < chartData.length"
        :type="chartData[activeChart].type"
        :options="chartData[activeChart].options"
        :series="chartData[activeChart].series"
      />
    </div>
  </q-card>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      arrows
      height="300px"
      class="bg-primary text-white shadow-1 rounded-borders"
    >
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn v-if="active" size="lg" icon="home" color="yellow" flat round dense @click="onClick" />
        <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
      </template>

      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-icon name="style" size="56px" />
        <div class="q-mt-md text-center">
          <div v-if="chartData.length > 0">
      <apexchart
        v-if="activeChart < chartData.length"
        :type="chartData[activeChart].type"
        :options="chartData[activeChart].options"
        :series="chartData[activeChart].series"
      />
    </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <q-icon name="live_tv" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="layers" class="column no-wrap flex-center">
        <q-icon name="layers" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="map" class="column no-wrap flex-center">
        <q-icon name="terrain" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>

  <div class="q-pa-md">
    <q-carousel
      arrows
      animated
      v-model="activeChart"
      height="400px"
    >
      <q-carousel-slide v-for="(chart, index) in chartData" :key="index" name="chartSlide">
        <div class="q-pa-md">
          <apexchart
        v-if="activeChart < chartData.length"
        :type="chartData[activeChart].type"
        :options="chartData[activeChart].options"
        :series="chartData[activeChart].series"
      />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>

</template>

<script>

import VueApexCharts from 'vue3-apexcharts'

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      activeChart: 0,
      chartData: [
        {
          type: 'bar',
          options: {
            // Chart options for the first chart
          },
          series: [
            // Series data for the first chart
          ],
        },
        // Add more chart data objects as needed
      ],
    };
  },
};

</script>

<style>
</style>

<template>
  <div>
    <Home/>
  </div>
</template>
-->

<!--
<script>
import Home from "@/pages/home.vue";
export default {
  name: "home",
  components: {
    Home,
  },
};
</script>
-->

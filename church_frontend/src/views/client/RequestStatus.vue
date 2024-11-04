<template>
  <div class="section">
    <q-card class="q-pa-md">
      <q-btn-dropdown label="View" class="bg-white">
        <q-list link>
          <q-item clickable @click="changeStatus('Baptism')">
            <q-item-main>
              <q-item-tile label>Baptism</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item clickable @click="changeStatus('Marriage')">
            <q-item-main>
              <q-item-tile label>Marriage</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item clickable @click="changeStatus('Confession')">
            <q-item-main>
              <q-item-tile label>Confession</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item clickable @click="changeStatus('Confirmation')">
            <q-item-main>
              <q-item-tile label>Confirmation</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item clickable @click="changeStatus('House Blessing')">
            <q-item-main>
              <q-item-tile label>House Blessing</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item clickable @click="changeStatus('Anointing of the Sick')">
            <q-item-main>
              <q-item-tile label>Anointing of the sick</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item clickable @click="changeStatus('Baptismal Certificate')">
            <q-item-main>
              <q-item-tile label>Baptismal Certificate</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-table
        table-class="bg-white text-black"
        card-class="bg-white text-black"
        table-header-class="text-black"
        flat
        bordered
        :title="selectedStatus === 'all' ? 'Baptism Requests' : `${selectedStatus} Requests`"
        :rows="rows"
        :columns="columns"
        row-key="memberId"
        :loading="loading"
      >
        <template v-slot:body-cell-details="props">
          <q-td :props="props">
            <ViewFullBaptism v-if="selectedStatus === 'Baptism'" :row="props.row" @updated="getData()"/>
            <ViewFullMarriage v-if="selectedStatus === 'Marriage'" :row="props.row"  @updated="getData()"/>
            <ViewFullAnointing v-if="selectedStatus === 'Anointing of the Sick'" :row="props.row" @updated="getData()" />
            <ViewFullConfession v-if="selectedStatus === 'Confession'" :row="props.row" @updated="getData()"/>
            <ViewFullConfirmation v-if="selectedStatus === 'Confirmation'" :row="props.row" @updated="getData()" />
            <ViewFullHouseBlessing v-if="selectedStatus === 'House Blessing'" :row="props.row" @updated="getData()"/>
            <ViewFullBaptismalCertificate v-if="selectedStatus === 'Baptismal Certificate'" :row="props.row" @updated="getData()"/>
          </q-td>
        </template>
        <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      </q-table>
    </q-card>
  </div>
</template>

<script setup>
import ViewFullBaptism from '@/views/detailview/ViewFullBaptism.vue';
import ViewFullMarriage from '@/views/detailview/ViewFullMarriage.vue';
import ViewFullConfession from '@/views/detailview/ViewFullConfession.vue';
import ViewFullConfirmation from '@/views/detailview/ViewFullConfirmation.vue';
import ViewFullAnointing from '@/views/detailview/ViewFullAnointing.vue';
import ViewFullHouseBlessing from '@/views/detailview/ViewFullHouseBlessing.vue';
import ViewFullBaptismalCertificate from '@/views/detailview/ViewFullBaptismalCertificate.vue';

import { useBaptismStore } from "@/stores/baptism";
import { useMarriageStore } from "@/stores/marriage";
import { useAnointingStore } from "@/stores/anointing";
import { useConfessionStore } from "@/stores/confession";
import { useConfirmationStore } from "@/stores/confirmation";
import { useHouseBlessingStore } from "@/stores/houseBlessing";
import { useBaptismalCertificateStore } from "@/stores/baptismal-certificate";

import { ref, computed, onMounted } from 'vue';

const baptismStore = useBaptismStore();
const marriageStore = useMarriageStore();
const anointingStore = useAnointingStore();
const confessionStore = useConfessionStore();
const houseBlessingStore = useHouseBlessingStore();
const confirmationStore = useConfirmationStore();
const baptismal_certificatetore = useBaptismalCertificateStore();



const columns = [
  { name: 'memberId', label: 'Member ID', align: 'left', field: 'memberId', sortable: true },
  // { name: 'name', label: 'Child Name', align: 'left', field: 'name', sortable: true },
  { name: 'date_requested', label: 'Date of Request', align: 'center', field: 'date_requested', sortable: true },
  { name: 'contact_number', label: 'Contact Number', align: 'center', field: 'contact_number', sortable: true },
  { name: 'email', label: 'Email', align: 'center', field: 'email', sortable: true },
  { name: 'status', label: 'Status', align: 'center', field: 'status', sortable: true },
  { name: 'details', label: 'Details', align: 'center' },
];
let loading = ref(false)
let rows = ref([])
// const rows = [
//   {
//     memberId: 12345,
//     name: 'Jarvis Carpo',
//     dateOfRequest: '2024-02-21',
//     timeOfRequest: '12:30 PM',
//     status: 'Marriage',
//   },
//   {
//     memberId: 67890,
//     name: 'Kim Altea',
//     dateOfRequest: '2024-02-20',
//     timeOfRequest: '03:45 PM',
//     status: 'Baptism',
//   },
//   // Add more rows for different statuses here
// ];


const selectedStatus = ref('Baptism');

onMounted(() => {
  getData()
})

// const filteredRows = computed(() => {
//   if (selectedStatus.value === 'all') {
//     return rows.value; // Accessing the array within the ref
//   } else {
//     return rows.value.filter((row) => row.status === selectedStatus.value); // Using rows.value.filter
//   }
// });

async function getData(){
  loading = true
  const statusToStoreMap = {
    "Baptism": baptismStore,
    "Marriage": marriageStore,
    "Confession": confessionStore,
    "Confirmation": confirmationStore,
    "House Blessing": houseBlessingStore,
    "Anointing of the Sick": anointingStore,
    "Baptismal Certificate": baptismal_certificatetore
  };

  const response = await statusToStoreMap[selectedStatus.value].getAll();
  console.log(response.data);
  const data = response.data;

  rows.value = [];

  // Assuming the data you provided is named `data`
  data.forEach((item) => {
    rows.value.push({
      memberId: item.user_id,
      item_id: item.id,
      contact_number: item.contact_number,
      email: item.email,
      date_requested: item.date_requested.substring(0, 10),
      status: item.status, // Assuming the status is always Baptism for this data
    });
  });
  loading = false
}

const changeStatus = (status) => {
  selectedStatus.value = status;
  getData()
};
</script>

<style scoped>
.section {
  margin-bottom: 20px; /* Adjust the value as needed */
  margin-top: 20px;
}
.q-btn-dropdown {
  margin-bottom: 10px;
}
.q-table th {
  font-weight: bold;
  font-size: 1.2em;
}
</style>

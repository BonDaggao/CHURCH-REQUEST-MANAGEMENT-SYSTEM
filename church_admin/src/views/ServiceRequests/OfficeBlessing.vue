<template>
  <div class="q-pa-md">
    <q-btn-dropdown label="View" class="bg-white">
      <q-list link>
        <q-item clickable @click="changeStatus('all')">
          <q-item-main>
            <q-item-tile label>All Requests</q-item-tile>
          </q-item-main>
        </q-item>
        <q-item clickable @click="changeStatus('Approved')">
          <q-item-main>
            <q-item-tile label>Approved Requests</q-item-tile>
          </q-item-main>
        </q-item>
        <q-item clickable @click="changeStatus('Pending')">
          <q-item-main>
            <q-item-tile label>Pending Requests</q-item-tile>
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
      title="Office Blessing Requests"
      :rows="filteredRows"
      :columns="columns"
      row-key="memberId"
    >
      <template v-slot:body-cell-details="props">
        <q-td :props="props">
          <ViewFullDocuDetails :formData="props.row" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import ViewFullDocuDetails from '@/components/layouts/ViewFullDocuDetails.vue';
import { ref, computed } from 'vue';

export default {
  setup() {
    const columns = [
      { name: 'memberId', label: 'Member ID', align: 'left', field: 'memberId', sortable: true },
      { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
      { name: 'dateOfRequest', label: 'Date of Request', align: 'center', field: 'dateOfRequest', sortable: true },
      { name: 'timeOfRequest', label: 'Time of Request', align: 'center', field: 'timeOfRequest', sortable: true },
      { name: 'status', label: 'Status', align: 'center', field: 'status', sortable: true },
      { name: 'details', label: 'Details', align: 'center' },
    ];

    const rows = [
      {
        memberId: 12345,
        name: 'Jarvis Carpo',
        dateOfRequest: '2024-02-21',
        timeOfRequest: '12:30 PM',
        status: 'Approved',
      },
      {
        memberId: 67890,
        name: 'Kim Altea',
        dateOfRequest: '2024-02-20',
        timeOfRequest: '03:45 PM',
        status: 'Pending',
      },
    ];

    const viewFullDetails = (row) => {
      console.log('View Full Details:', row);
    };

    const selectedStatus = ref('all');

    const filteredRows = computed(() => {
      if (selectedStatus.value === 'all') {
        return rows;
      } else {
        return rows.filter((row) => row.status === selectedStatus.value);
      }
    });

    const changeStatus = (status) => {
      selectedStatus.value = status;
    };

    return {
      columns,
      rows,
      viewFullDetails,
      selectedStatus,
      changeStatus,
      filteredRows,
    };
  },
  components: {
    ViewFullDocuDetails,
  },
};
</script>

<style>
.q-btn-dropdown {
  margin-bottom: 10px;
}
.q-table th {
  font-weight: bold;
  font-size: 1.2em;
}
</style>

]<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <div class="buttons">
      <q-btn-dropdown label="View" class="bg-white" style="margin-right: 10px;">
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
      <q-btn
        class = "export"
        icon-right="archive"
        label="Export to csv"
        no-caps
        @click="exportTable"
      />
    </div>
    </div>

    <q-table
      table-class="bg-white text-black"
      card-class="bg-white text-black"
      table-header-class="text-black"
      flat
      bordered
      title="Confirmation Requests"
      :rows="filteredRows"
      :columns="columns"
      row-key="user_id"
    >
      <template v-slot:body-cell-details="props">
        <q-td :props="props">
          <ViewFullConfirmation :row="props.row" @updated="getData()" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import ViewFullConfirmation from '@/components/layouts/ViewFullConfirmation.vue';
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { exportFile } from 'quasar';
import { useConfirmationStore } from "@/stores/confirmation";

const confirmationStore = useConfirmationStore();

export default {
  setup() {
    const columns = [
      { name: 'user_id', label: 'Member ID', align: 'left', field: 'user_id', sortable: true },
      { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
      { name: 'date_requested', label: 'Date Requested', align: 'center', field: 'date_requested', sortable: true },
      { name: 'time_requested', label: 'Time Requested', align: 'center', field: 'time_requested', sortable: true },
      { name: 'status', label: 'Status', align: 'center', field: 'status', sortable: true },
      { name: 'details', label: 'Details', align: 'center' },
    ];

    let loading = ref(false);
    let rows = ref([]);

    async function getData() {
      loading.value = true;
      const statusToStoreMap = {
        "all": confirmationStore.getAll(),
        "Pending": confirmationStore.getAllPending(),
        "Approved": confirmationStore.getAllApproved(),
        "Rejected": confirmationStore.getAllRejected(),
      };

      const response = await statusToStoreMap[selectedStatus.value];
      console.log(response.data);
      const data = response.data;

      rows.value = [];

      // Assuming the data you provided is named `data`
      data.forEach((item) => {
        // Convert time to 12-hour format
        let time = item.time_requested;
        let hours = parseInt(time.substring(0, 2), 10);
        let minutes = time.substring(3);
        let period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        let time12HourFormat = `${hours}:${minutes} ${period}`;

        rows.value.push({
          user_id: item.user_id,
          item_id: item.id,
          contact_number: item.contact_number,
          email: item.email,
          preferred_date: item.preferred_date.substring(0, 10),
          preferred_time: item.preferred_time,
          name: item.name,
          status: item.status, // Assuming the status is always Baptism for this data
          date_requested: item.date_requested.substring(0, 10), // Display only date
          time_requested: time12HourFormat, // Assigning 12-hour formatted time
        });
      });
      loading.value = false;
    }

    onMounted(() => {
      getData();
    });

    const selectedStatus = ref('all');
    const toggleStatus = ref(false);
    const $q = useQuasar();

    const changeStatus = (status) => {
      selectedStatus.value = status;
      getData();
    };

    const filteredRows = computed(() => {
      if (selectedStatus.value === 'all') {
        return rows.value;
      } else {
        return rows.value.filter((row) => row.status === selectedStatus.value);
      }
    });

    const exportTable = () => {
 
      const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '_');
      const filename = `ConfessionRequest_${currentDate}.csv`;
      const content = [columns.map(col => wrapCsvValue(col.label))].concat(
        rows.value.map(row => columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format,
          row
        )).join(','))
      ).join('\r\n');


      const status = exportFile(
        filename,
        content,
        'text/csv'
      );

 
      if (status !== true) {
        $q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        });
      }
    };

    function wrapCsvValue(val, formatFn, row) {
      let formatted = formatFn !== void 0
        ? formatFn(val, row)
        : val;

      formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted);

      formatted = formatted.split('"').join('""');

      return `"${formatted}"`;
    }

    return {
      columns,
      rows,
      selectedStatus,
      toggleStatus,
      changeStatus,
      filteredRows,
      getData,
      exportTable
    };
  },
  components: {
    ViewFullConfirmation,
  },
};
</script>


<style scoped>

.q-table th {
  font-weight: bold;
  font-size: 1.2em;
}

.buttons{
  display:inline-flex;
  margin-bottom: 10px;
}

.export{
  background-color: #ffaa2b
}
</style>

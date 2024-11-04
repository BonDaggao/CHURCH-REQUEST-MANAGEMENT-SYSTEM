<template>
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
          class="export"
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
      title="MarriageCertificate Requests"
      :rows="filteredRows"
      :columns="columns"
      row-key="user_id"
    >
      <template v-slot:body-cell-details="props">
        <q-td :props="props">
          <ViewFullDocuDetails :row="props.row" @updated="getData()" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import ViewFullDocuDetails from '@/components/layouts/ViewFullDocuDetails.vue';
import { ref, computed } from 'vue';
import { useQuasar, exportFile } from 'quasar';

export default {
  setup() {
    const columns = [
      { name: 'user_id', label: 'Member ID', align: 'left', field: 'user_id', sortable: true },
      { name: 'name', label: 'Name', align: 'left', field: 'name', sortable: true },
      { name: 'copies', label: '# of Copies', align: 'center', field: 'copies', sortable: true },
      { name: 'status', label: 'Status', align: 'center', field: 'status', sortable: true },
      { name: 'details', label: 'Details', align: 'center' },
    ];

    const rows = [
      {
        user_id: 12345,
        name: 'Jarvis Carpo',
        copies: 5,
        status: 'Approved',
      },
      {
        user_id: 67890,
        name: 'Kim Altea',
        copies: 10,
        status: 'Pending',
      },
      {
          memberId: 11223,
          name: 'Vince Tan',
          copies: 6,
          status: 'Approved',
        },
        {
          memberId: 33445,
          name: 'Carlo Santos',
          copies: 12,
          status: 'Pending',
        },
        {
          memberId: 55667,
          name: 'John Slay',
          copies: 7,
          status: 'Approved',
        },
        {
          memberId: 77889,
          name: 'Eme Eme',
          copies: 9,
          status: 'Pending',
        },
        {
          memberId: 99000,
          name: 'Rina Sawayama',
          copies: 4,
          status: 'Approved',
        },
        {
          memberId: 11234,
          name: 'Slay',
          copies: 11,
          status: 'Pending',
        },
      
    ];

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

    const exportTable = () => {
      const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '_');
      const filename = `MarriageRequests_${currentDate}.csv`;
      const content = [columns.map(col => wrapCsvValue(col.label))].concat(
        rows.map(row => columns.map(col => wrapCsvValue(
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
      changeStatus,
      filteredRows,
      exportTable,
    };
  },
  components: {
    ViewFullDocuDetails,
  },
};
</script>

<style scoped>
.q-table th {
  font-weight: bold;
  font-size: 1.2em;
}

.buttons {
  display: inline-flex;
  margin-bottom: 10px;
}

.export {
  background-color: #ffaa2b;
}
</style>
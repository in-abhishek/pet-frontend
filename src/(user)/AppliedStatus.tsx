import type { TableColumn } from 'react-data-table-component';
import { useAuth } from '../context/Context';
import { useGet } from '../hooks/hooks';
import type { Pet } from '../utils/AuthUtils';
import DataTable from 'react-data-table-component';

// Defining the shape of the Adoption record
interface AdoptionApplication {
  _id: string;
  status: 'pending' | 'approved' | 'rejected';
  applicationDate: string;
  petId: Pet;
}

const AppliedStatus = () => {
  const { accessToken } = useAuth();
  
  const { data: applications, isLoading } = useGet<AdoptionApplication[]>('/my-adoptions', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  const columns: TableColumn<AdoptionApplication>[] = [
    {
      name: 'Pet',
      cell: (row) => (
        <div className="flex gap-4 align-items-center py-2">

          {
            row.petId?.imageUrl ?
              <img
                src={row.petId?.imageUrl || ''}
                alt={row.petId?.name}
                className="w-100 h-20 object-fit-cover"
                style={{ position: 'absolute' }}
              /> :
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '6px',
                  backgroundColor: '#f0f0f0',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
              </div>
          }

          <div>
            <div className="fw-bold">{row.petId?.name || 'Unknown Pet'}</div>
            <small className="text-muted">{row.petId?.breed}</small>
          </div>
        </div>
      ),
      sortable: true,
      grow: 2,
    },
    {
      name: 'Applied On',
      selector: (row) => new Date(row.applicationDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row) => {
        const statusColors = {
          pending: { bg: '#fff3cd', text: '#856404' },
          approved: { bg: '#d4edda', text: '#155724' },
          rejected: { bg: '#f8d7da', text: '#721c24' }
        };
        const style = statusColors[row.status] || statusColors.pending;

        return (
          <span style={{
            backgroundColor: style.bg,
            color: style.text,
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'capitalize'
          }}>
            {row.status}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: 'Decision Date',
      selector: (row) => row.status !== 'pending' ? 'Recently' : '-',
    }
  ];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-2">My Applications</h2>
        <span className="badge bg-secondary text-white px-4 py-2 rounded-lg">{applications?.length || 0} Total</span>
      </div>

      <div className="card shadow-sm border-0">
        <DataTable
          columns={columns}
          data={applications || []}
          progressPending={isLoading}
          pagination
          highlightOnHover
          responsive
          noDataComponent={
            <div className="p-5 text-center text-muted">
              You haven't submitted any adoption requests yet.
            </div>
          }
        />
      </div>
    </div>
  );
};

export default AppliedStatus;
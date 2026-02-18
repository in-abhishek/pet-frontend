import AlertToast from '../../components/toast/AlertToast';
import { useAuth } from '../../context/Context';
import { useAlertToast,  useGet, usePost } from '../../hooks/hooks';
import type { TableColumn } from 'react-data-table-component';
import DataTable from 'react-data-table-component';

interface AdoptionRequest {
  _id: string;
  status: 'pending' | 'approved' | 'rejected';
  petId: { name: string; breed: string };
  userId: { firstName: string; lastName: string; email: string };
  createdAt: string;
}

const Dashboard = () => {
  const { accessToken } = useAuth();
  const { alert, showSuccess, showError, clearAlert } = useAlertToast();


  // Fetch all requests
  const { data: requests, isLoading, refetch } = useGet<AdoptionRequest[]>('/admin/adoptions', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  const { execute: updateStatus } = usePost('/admin/update-status');

  const handleAction = (id: string, newStatus: string) => {
    updateStatus({ requestId: id, status: newStatus }, {
      headers: { Authorization: `Bearer ${accessToken}` },
      onSuccess: () => {
        showSuccess("Success", `Application ${newStatus} successfully.`);
        refetch();
      },
      onError: (err) => showError("Error", err.message)
    });
  };

  const columns: TableColumn<AdoptionRequest>[] = [
    {
      name: 'User Details',
      cell: (row) => (
        <div className="py-2">
          <div className="fw-bold">{row.userId?.firstName + '' + row.userId?.lastName || 'N/A'}</div>
          <small className="text-muted">{row.userId?.email}</small>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Pet',
      cell: (row) => (
        <div>
          <div className="fw-bold">{row.petId?.name}</div>
          <small className="text-muted">{row.petId?.breed}</small>
        </div>
      ),
    },
    {
      name: 'Status',
      cell: (row) => (
        <span className={`badge flex gap-4 ${row.status === 'approved' ? 'bg-success' :
          row.status === 'rejected' ? 'bg-danger' : 'bg-warning text-dark'
          }`}>
          {row.status.toUpperCase()}
        </span>
      ),
    },
    {
      name: 'Actions',
      ignoreRowClick: true,
      cell: (row) => (
        <div className="flex gap-4">
          {row.status === 'pending' ? (
            <>
              <button
                onClick={() => handleAction(row._id, 'approved')}
                className="btn btn-sm btn-success"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(row._id, 'rejected')}
                className="btn btn-sm btn-danger"
              >
                Reject
              </button>
            </>
          ) : (
            <span className="text-muted small">Processed</span>
          )}
        </div>
      ),
    }
  ];

  return (
    <div className="w-full py-5 px-4">
      {alert && (
        <AlertToast
          type={alert.type}
          title={alert.title}
          description={alert.description}
          onClose={clearAlert}
        />
      )}
      <h2 className="mb-4 fw-bold text-primary">Admin Dashboard</h2>
      <p className="text-muted">Manage incoming adoption requests</p>

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body p-0">
          <DataTable
            columns={columns}
            data={requests || []}
            progressPending={isLoading}
            pagination
            highlightOnHover
            customStyles={{
              headCells: { style: { fontWeight: 'bold', fontSize: '14px' } }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
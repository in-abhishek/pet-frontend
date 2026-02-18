import type { TableColumn } from 'react-data-table-component';
import { useAlertToast, useFilter, useGet } from '../hooks/hooks';
import type { Pet } from '../utils/AuthUtils';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import InputSearch from '../components/input-search/InputSearch';
import { useAuth } from '../context/Context';
import Button from '../components/core/button';
import AlertToast from '../components/toast/AlertToast';
import { useState } from 'react';


const PetListing = () => {
  const { accessToken, user } = useAuth();
  const role = user?.role
  const { data: pets, isLoading, refetch } = useGet<Pet[]>('/pets');
  const { alert, showError, showSuccess, clearAlert } = useAlertToast();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    name: "",
    breed: "",
    age: ""
  });
  const { setSearchText, filteredData } = useFilter(pets, ['name', 'breed', 'species'], filters);



  const handleDelete = async (id: string) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/pets/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      showSuccess("Pet Deleted", '')
      refetch()
    } catch (err) {
      showError("Pet Deleted Failed", err);
    }
  };
  const columns: TableColumn<Pet>[] = [
    {
      name: 'Image',
      cell: (row) => (
        row.imageUrl ? (
          <img
            src={row.imageUrl}
            alt={row.name}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid #ddd'
            }}
          />
        ) : (
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
        )
      ),
      width: '70px'
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Species',
      selector: (row) => row.species,
      sortable: true,
    },
    {
      name: 'Breed',
      selector: (row) => row.breed,
    },
    {
      name: 'Age',
      selector: (row) => row.age,
    },
    {
      name: 'Status',
      cell: (row) => (
        <span className={`badge ${row.status === 'available' ? 'bg-success' : 'bg-warning'}`}>
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          {
            role === 'admin' ?
              <div className='flex items-center gap-4'>
                <Button
                  variant='primary'
                  onClick={() => navigate(`/edit/${row._id}`)}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </Button>
                <Button
                  variant='danger'
                  onClick={() => handleDelete(row._id)}
                >
                  Delete
                </Button>
              </div> : <button
                onClick={() => navigate(`/pet/${row._id}`)}
                className="btn btn-sm btn-primary"
              >
                View
              </button>
          }
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const nameOptions = [...new Set((pets ?? []).map(p => p.name))];
  const breedOptions = [...new Set((pets ?? []).map(p => p.breed))];
  const ageOptions = [...new Set((pets ?? []).map(p => p.age))];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  return (
    <div className="w-full mt-4">
      {alert && (
        <AlertToast
          type={alert.type}
          title={alert.title}
          description={alert.description}
          onClose={clearAlert}
        />
      )}
      <div className="card shadow">
        <div className="card-header mb-0 p-3 bg-white flex justify-between items-center gap-4 flex-wrap">
          <h2 >Pet Listing</h2>
          <div className='flex items-center gap-4 flex-wrap'>
            <select onChange={e => handleFilterChange("name", e.target.value)} className="text-text-secondary bg-gray-50 h-11 border px-4 outline-0 border-border shadow-xs rounded-lg">
              <option value="">All Names</option>
              {nameOptions.map(n => <option key={n}>{n}</option>)}
            </select>

            <select onChange={e => handleFilterChange("breed", e.target.value)} className="text-text-secondary bg-gray-50 h-11 border px-4 outline-0 border-border shadow-xs rounded-lg">
              <option value="">All Breeds</option>
              {breedOptions.map(b => <option key={b}>{b}</option>)}
            </select>

            <select onChange={e => handleFilterChange("age", e.target.value)} className="text-text-secondary bg-gray-50 h-11 border px-4 outline-0 border-border shadow-xs rounded-lg">
              <option value="">All Ages</option>
              {ageOptions.map(a => <option key={a}>{a}</option>)}
            </select>

            <InputSearch onSearch={setSearchText} />
          </div>

        </div>
        <div className="card-body">
          <DataTable
            columns={columns}
            data={filteredData || []}
            progressPending={isLoading}
            pagination
            highlightOnHover
            responsive
            noDataComponent="No pets found."
          />
        </div>
      </div>
    </div>
  );
};

export default PetListing;
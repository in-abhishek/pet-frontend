import { useParams, useNavigate } from 'react-router-dom';
import { useAlertToast, useGet, usePost } from '../hooks/hooks';
import type { Pet } from '../utils/AuthUtils';
import AlertToast from '../components/toast/AlertToast';
import { useAuth } from '../context/Context';
import { BackArrow } from '../assets/iconset';
import Button from '../components/core/button';

const PetDetails = () => {
    const { accessToken } = useAuth();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { alert, showError, showSuccess, clearAlert } = useAlertToast();

    const { data: pet, isLoading, error, refetch } = useGet<Pet & { alreadyApplied: boolean, userApplicationStatus: string }>(
        `/pets/${id}`,
        {
            headers: {
                'Authorization': accessToken ? `Bearer ${accessToken}` : ''
            }
        }
    );
    const { execute: requestAdoption, isLoading: isSubmitting } = usePost('/adopt');

    const handleAdoptionRequest = () => {
        requestAdoption({ petId: id }, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            onSuccess: () => {
                showSuccess("Request Sent!", "The shelter will contact you soon.")
                refetch()
            },
            onError: (err) => {
                showError("Request Failed", err)
            }
        });
    };

    if (isLoading) return <div className="text-center mt-5 py-5"><div className="spinner-border text-primary"></div></div>;
    if (error || !pet) return <div className="container mt-5"><div className="alert alert-danger">Pet not found or invalid ID.</div></div>;

    return (
        <div className="container py-5">
            {alert && <AlertToast type={alert.type} title={alert.title} description={alert.description} onClose={clearAlert} />}

            <Button
                type='button'
                leftIcon={<BackArrow />}
                variant='secondary'
                onClick={() => navigate(-1)}
                className='mx-3 mb-2 flex items-center'
            >
                Back to Listing
            </Button>

            <div className="card border-0 shadow-lg overflow-hidden">
                <div className="row g-0">
                    {/* Left Side: Image */}
                    <div className="col-lg-6 bg-light h-20 w-fit rounded-lg px-3 d-flex align-items-center justify-content-center" >
                        {pet.imageUrl ? (
                            <img
                                src={pet.imageUrl}
                                alt={pet.name}
                                className="w-100 h-20 object-fit-cover"
                            />
                        ) : (
                            <div className="text-center text-muted">
                                <span>No Image Available</span>
                            </div>
                        )}
                    </div>

                    <div className="col-lg-6 p-4 p-md-5 bg-white">
                        <div className="mb-4">
                            {pet.alreadyApplied ? (
                                <span className="badge bg-info text-dark py-2">
                                    APPLICATION SENT <span className='px-3 py-1 bg-warning inline-flex font-semibold justify-center items-center'>({pet.userApplicationStatus.toUpperCase()})</span>
                                </span>
                            ) : (
                                <span className={`badge ${pet.status === 'available' ? 'bg-success' : 'bg-warning'} px-3 py-2`}>
                                    {pet.status.toUpperCase()}
                                </span>
                            )}
                            <h1 className="display-5  text-dark mt-1">{pet.name}</h1>
                        </div>

                        <h6 className="text-uppercase  text-muted mb-3">Specifications</h6>
                        <table className="table table-bordered mb-4">
                            <tbody>
                                <tr>
                                    <th className="bg-light w-25">Species</th>
                                    <td>{pet.species}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light">Breed</th>
                                    <td>{pet.breed}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light">Age</th>
                                    <td>{pet.age} Years</td>
                                </tr>
                            </tbody>
                        </table>
                        <h6 className="text-uppercase  text-muted mb-3">Description</h6>
                        <p className="text-secondary mb-4" style={{ lineHeight: '1.6' }}>
                            {pet.description || "This pet doesn't have a description yet. Contact us to learn more about their personality and needs!"}
                        </p>
                        <div className="d-grid gap-2">
                            <Button
                                type='button'
                                variant='primary'
                                onClick={handleAdoptionRequest}
                                disabled={isSubmitting || pet.status !== 'available'}
                            >
                                {isSubmitting ? (
                                    <><span className="spinner-border spinner-border-sm me-2"></span>Processing...</>
                                ) : (
                                    'Submit Adoption Request'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetails;
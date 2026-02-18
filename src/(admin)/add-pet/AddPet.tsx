import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { Input } from '../../components/core/input';
import type { PetFormValues } from '../../utils/AuthUtils';
import Button from '../../components/core/button';
import { useAlertToast, usePost } from '../../hooks/hooks';
import AlertToast from '../../components/toast/AlertToast';
import { useAuth } from '../../context/Context';

const AddPet = () => {
    const { accessToken } = useAuth();
    const { execute, isLoading } = usePost<PetFormValues, any>('/add-pet');
    const { alert, showError, showSuccess, clearAlert } = useAlertToast();

    const { control, handleSubmit, reset, formState: { errors } } = useForm<PetFormValues>({
        defaultValues: {
            name: "",
            species: "",
            breed: "",
            age: 0,
            description: "",
            status: "available",
        },
    });

    const onSubmit: SubmitHandler<PetFormValues> = (data) => {
        execute(data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            onSuccess: (res) => {
                showSuccess("Success", res.message);
                console.log("Saved Pet:", res.pet);
                reset();
            },

            onError: (err) => {
                showError("Error", err);
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg h-auto">
            {alert && (
                <AlertToast
                    type={alert.type}
                    title={alert.title}
                    description={alert.description}
                    onClose={clearAlert}
                />
            )}
            <h2 className="text-2xl font-bold mb-6">Add a New Pet for Adoption</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Pet Name */}
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Pet name is required" }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label="Pet Name"
                            id="name"
                            placeholder="e.g. Buddy"
                            error={errors.name?.message}
                        />
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    {/* Species */}
                    <Controller
                        name="species"
                        control={control}
                        rules={{ required: "Species is required" }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Species"
                                id="species"
                                placeholder="e.g. Dog"
                                error={errors.species?.message}
                            />
                        )}
                    />

                    {/* Breed */}
                    <Controller
                        name="breed"
                        control={control}
                        rules={{ required: "Breed is required" }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Breed"
                                id="breed"
                                placeholder="e.g. Golden Retriever"
                                error={errors.breed?.message}
                            />
                        )}
                    />
                </div>

                {/* Age */}
                <Controller
                    name="age"
                    control={control}
                    rules={{
                        required: "Age is required",
                        min: { value: 0, message: "Age cannot be negative" }
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="number"
                            label="Age (Years)"
                            id="age"
                            error={errors.age?.message}
                        />
                    )}
                />

                {/* Status Dropdown */}
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Listing Status</label>
                            <select {...field} className="text-text-secondary bg-gray-50 h-11 border px-4 outline-0 border-border shadow-xs rounded-lg">
                                <option value="available">Available</option>
                                <option value="pending">Pending</option>
                                <option value="adopted">Adopted</option>
                            </select>
                        </div>
                    )}
                />

                {/* Description */}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Description</label>
                            <textarea
                                {...field}
                                className="text-text-secondary bg-gray-50 h-32 outline-0 p-4 border border-border shadow-xs rounded-lg"
                                placeholder="Describe the pet's personality..."
                            />
                        </div>
                    )}
                />



                <Button
                    type="submit"
                    variant="authPrimary"
                    className='mt-8'
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Add Pet to Listing"}
                </Button>
            </form>
        </div>
    );
};

export default AddPet;
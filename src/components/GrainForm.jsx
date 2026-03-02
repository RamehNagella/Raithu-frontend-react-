import React, { useEffect, useState } from "react";

const GrainForm = ({
  initialData,
  onSubmit,
  loading,
  error,
  submitButtonText = "Submit",
  isUpdateMode = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    grainType: "",
    variety: "",
    description: "",
    price: "",
    unit: "",
    availableQuantity: "",
    photo: "",
    qualityGrade: "2",
    harvestDate: "",
    isOrganic: false,
  });
  const [isInitialized, setIsInitailized] = useState(false);

  //this will be work for only add grain
  // for update grain it is having all the fields
  // document and sends updated data to backend
  // with all fileds like _id, sellerId which are
  // not allowed to update

  // useEffect(() => {
  //   if (initialData) {
  //     setFormData({
  //       ...initialData,
  //       photo: initialData?.photo?.[0]?.url || "",
  //       harvestDate: initialData?.harvestDate
  //         ? new Date(initialData.harvestDate).toISOString().split("T")[0]
  //         : "",
  //     });
  //   }
  // }, [initialData]);

  //call useEffect with updated Allowed fields only (this will work for add grain because initial data is null or undefined at the time add grin )

  useEffect(() => {
    if (initialData && !isInitialized) {
      setFormData({
        name: initialData.name || "",
        grainType: initialData.grainType || "",
        variety: initialData.variety || "",
        description: initialData.description || "",
        price: initialData.price || "",
        unit: initialData.unit || "",
        availableQuantity: initialData.availableQuantity || "",
        photo: initialData?.photo?.[0]?.url || "",
        isOrganic: initialData.isOrganic || false,
        qualityGrade: initialData.qualityGrade || "2",
        isActive: initialData.isActive ?? true,
        harvestDate: initialData?.harvestDate
          ? new Date(initialData.harvestDate).toISOString().split("T")[0]
          : "",
      });
      setIsInitailized(true);
    }
  }, [initialData, isInitialized]);
  // console.log("Rendering form");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="px-2 py-4 bg-gray-700 rounded-2xl">
      <div className="max-w-md mx-auto bg-gray-200 shadow-xl rounded-2xl p-4">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-900">
          {submitButtonText === "Add Grain"
            ? "Add Grain Product"
            : "Update Grain Product"}
        </h1>
        {error && <div className="alert alert-error mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Grain Name *"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
          />
          <select
            name="grainType"
            className="select select-bordered w-full"
            value={formData.grainType}
            onChange={handleChange}
          >
            <option value="">select grain type </option>
            <option value="Rice">Rice</option>
            <option value="Wheat">Wheat</option>
            <option value="Millets">Millets</option>
          </select>

          <input
            name="variety"
            placeholder="type of variety *"
            className="input input-bordered w-full"
            value={formData.variety}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder="Price per unit*"
            className="input input-bordered w-full"
            value={formData.price}
            onChange={handleChange}
          />

          <select
            name="unit"
            className="select select-bordered w-full"
            value={formData.unit}
            onChange={handleChange}
          >
            <option value="">Select unit here </option>
            <option value="kg">Kg</option>
            <option value="quintal">quintal</option>
            <option value="ton">ton</option>
          </select>

          <input
            name="availableQuantity"
            type="number"
            placeholder="available Quantity *"
            className="input input-bordered w-full"
            value={formData.availableQuantity}
            onChange={handleChange}
          />

          <input
            name="photo"
            placeholder="Image URL *"
            className="input input-bordered w-full"
            value={formData.photo}
            onChange={handleChange}
          />

          <label className="flex items-center gap-2 text-gray-900">
            <input
              type="checkbox"
              name="isOrganic"
              className="checkbox checkbocx-success border-2 border-green-700 bg-white"
              checked={formData.isOrganic}
              onChange={handleChange}
            />
            Organic
          </label>

          <textarea
            name="description"
            placeholder="Description (Required)"
            className="textarea textarea-bordered w-full"
            rows="2"
            value={formData.description}
            onChange={handleChange}
          />
          <label className="text-gray-900">
            Harvest Date
            <input
              name="harvestDate"
              type="string"
              placeholder="Harvest Date*"
              className="input input-bordered w-full text-blue-300"
              value={formData.harvestDate}
              onChange={handleChange}
            />
          </label>

          {isUpdateMode && (
            <>
              <select
                name="isActive"
                className="select select-bordered w-full"
                value={formData.isActive?.toString()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.value === "true",
                  }))
                }
              >
                <option value="">Select Status</option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>

              <select
                name="qualityGrade"
                className="select select-bordered w-full"
                value={formData.qualityGrade}
                onChange={handleChange}
              >
                <option value="1"> Grade 1</option>
                <option value="2"> Grade 2</option>
                <option value="3"> Grade 3</option>
              </select>
            </>
          )}

          <button
            type="submit"
            className={`btn btn-secondary bg-gray-500 text-green-500 font-semibold hove:bg-gray-600 w-full ${
              loading ? "btn-disabled" : ""
            }`}
          >
            {loading ? "Processing..." : submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GrainForm;

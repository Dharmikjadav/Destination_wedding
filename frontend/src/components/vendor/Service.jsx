import React, { useEffect, useState } from "react";
import { getServices, addService, deleteService } from "../../api/serviceApi";

const Service = () => {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    service_name: "",
    category: "",
    description: "",
    price: "",
    image: "",
  });

  const [base64Image, setBase64Image] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("Fetching services for user:", user);
      // console.log("User ID:", user ? user._id : "No user found");
      const data = await getServices(user.id);
      console.log("Fetched services:", data);
      setServices(data || []);

    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleImageChange = (event) => {

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result;
        setBase64Image(base64);
        setPreviewImage(base64);
      };
    
    reader.readAsDataURL(file);
  };
};

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();

    if (!formData.service_name || !formData.category || !formData.price) {
      alert("Please fill required fields");
      return;
    }

    try {

      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        vendor_id: user.id,
        service_name: formData.service_name,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        image: base64Image,
      };

      await addService(payload);

      fetchServices();

      setFormData({
        service_name: "",
        category: "",
        description: "",
        price: "",
        image: "",
      });

      setPreviewImage(null);
      setBase64Image(null);

    } catch (error) {
      console.error("Error adding service", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this service?")) return;

    try {
      await deleteService(id);
      fetchServices();
    } catch (error) {
      console.error("Delete failed", error);
    }

  };

  return (

    <div className="p-6 max-w-7xl mx-auto w-full space-y-8">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Vendor Services
        </h1>
        <p className="text-sm text-slate-500">
          Add and manage your service offerings
        </p>
      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border border-slate-200 space-y-4"
      >

        <h3 className="font-semibold text-lg">Add New Service</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            name="service_name"
            value={formData.service_name}
            onChange={handleChange}
            placeholder="Service Name"
            className="border p-2 rounded-md"
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 rounded-md"
          />

          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded-md"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded-md"
          />

        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded-md w-full"
        />

        {previewImage && (
          <img
            src={previewImage}
            alt="preview"
            className="h-32 rounded-md"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
        >
          {loading ? "Saving..." : "Save Service"}
        </button>

      </form>

      {/* SERVICE LIST */}

      <div>

        <h3 className="text-xl font-semibold mb-4">
          Your Services
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service) => (

            <div
              key={service._id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
            >

              {service.image && (

                <img
                  src={service.image}
                  alt={service.service_name}
                  onClick={() => setModalImage(service.image)}
                  className="h-40 w-full object-cover cursor-pointer"
                />

              )}

              <div className="p-4 space-y-2">

                <h4 className="font-bold text-lg">
                  {service.service_name}
                </h4>

                <p className="text-sm text-slate-500">
                  {service.category}
                </p>

                <p className="font-semibold text-indigo-600">
                  ₹{service.price}
                </p>

                <p className={`text-xs font-semibold ${service.status === "approved"
                    ? "text-green-600"
                    : service.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}>
                  Status: {service.status}
                </p>

                {service.status !== "approved" && (

                  <button
                    onClick={() => handleDelete(service._id)}
                    className="mt-2 bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>

                )}

              </div>

            </div>

          ))}

          {services.length === 0 && (
            <p className="text-slate-400">
              No services available
            </p>
          )}

        </div>

      </div>

      {modalImage && (

        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
          onClick={() => setModalImage(null)}
        >

          <img
            src={modalImage}
            alt="Full View"
            className="max-h-[80%] max-w-[80%] rounded-lg"
          />

        </div>

      )}

    </div>

  );

};

export default Service;
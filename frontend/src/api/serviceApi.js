const BASE_URL = "http://127.0.0.1:8000";

export const getServices = async (vendor_Id) => {
  const response = await fetch(`${BASE_URL}/vendor/services/${vendor_Id}`);
  return response.json();
};

export const addService = async (serviceData) => {
  const response = await fetch(`${BASE_URL}/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceData),
  });

  return response.json();
};

export const deleteService = async (serviceId) => {
  const response = await fetch(`${BASE_URL}/services/${serviceId}`, {
    method: "DELETE",
  });

  return response.json();
};
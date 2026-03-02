import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import GrainForm from "./GrainForm";

const UpdateGrain = () => {
  const { grainId } = useParams();
  console.log(">>", grainId);
  const navigate = useNavigate();

  const [grainData, setGrainData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchGrain = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/grain/${grainId}`, {
        withCredentials: true,
      });
      console.log("update: ", res.data.data);
      setGrainData(res?.data?.data);
    } catch (err) {
      setError("Failed to fetch grain Data");
    }
  };
  console.log("ggg", grainData);

  useEffect(() => {
    fetchGrain();
  }, [grainId]);
  const handleUpdateGrain = async (formData) => {
    try {
      setLoading(true);
      await axios.patch(
        `${BASE_URL}/grain/${grainId}`,
        {
          ...formData,
          photo: [
            {
              url: formData.photo,
              source: "web",
            },
          ],
        },
        { withCredentials: true },
      );
      navigate("/my-grains");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  if (!grainData) return <div> Loading ....</div>;
  return (
    <GrainForm
      initialData={grainData}
      onSubmit={handleUpdateGrain}
      loading={loading}
      error={error}
      submitButtonText="UpdateGrain"
      isUpdateMode={true}
    />
  );
};

export default UpdateGrain;

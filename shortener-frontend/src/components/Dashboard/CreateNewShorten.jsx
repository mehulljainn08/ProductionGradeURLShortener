import React, { useState } from 'react';
import { useStoreContext } from '../../contextApi/ContextApi';
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import { Tooltip } from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import api from '../../api/api';
import toast from 'react-hot-toast';

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: '',
    },
    mode: 'onTouched',
  });

  const createShortUrlHandler = async (data) => {
  setLoading(true);
  let { originalUrl } = data;

  // 🛠️ Auto-prepend https:// if not present
  if (!/^https?:\/\//i.test(originalUrl)) {
    originalUrl = `https://${originalUrl}`;
  }

  console.log("Final URL:", originalUrl);

  try {
    const response = await api.post('/api/urls/shorten', { originalUrl }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const { shortUrl } = response.data;
const fullShortUrl = `${import.meta.env.VITE_REACT_BACKEND_URL}/${shortUrl}`;
await navigator.clipboard.writeText(fullShortUrl);



    toast.success('Short URL copied to clipboard!', {
      position: 'bottom-center',
      duration: 3000,
    });

    if (typeof refetch === 'function') await refetch();
   // await refetch()
    reset();
    setOpen(false);
  } catch (error) {
    console.error(" Error:", error);
    toast.error('Failed to create short URL. Try again!');
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex justify-center items-center bg-white rounded-md">
      <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="w-[360px] sm:w-[450px] relative p-6 rounded-md shadow-md"
      >
        <h1 className="text-center font-bold text-xl text-gray-800 mb-4">
          Create New Shorten URL
        </h1>

        <TextField
          label="Enter URL"
          required
          id="originalUrl"
          placeholder="https://example.com"
          type="url"
          message="URL is required"
          register={register}
          errors={errors}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          {loading ? 'Loading...' : 'Create'}
        </button>

        {!loading && (
          <Tooltip title="Close">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2"
            >
              <RxCross2 className="text-gray-800 text-2xl" />
            </button>
          </Tooltip>
        )}
      </form>
    </div>
  );
};

export default CreateNewShorten;

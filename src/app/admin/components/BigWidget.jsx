import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const BigWidget = ({ listing }) => {
  const [blurDataURL, setBlurDataURL] = useState(null);

  useEffect(() => {
    const fetchBlurImage = async () => {
      if (listing?.imageUrls?.[0]) {
        try {
          const response = await fetch(`/api/base64?url=${encodeURIComponent(listing.imageUrls[0])}`);
          const data = await response.json();
          if (response.ok && data.base64) {
            setBlurDataURL(data.base64);
          } else {
            console.error('Error fetching blur image:', data.error);
          }
        } catch (error) {
          console.error('Failed to fetch blur image:', error.message);
        }
      }
    };

    fetchBlurImage();
  }, [listing]);

  if (!listing) return <ClipLoader />;

  return (
    <div className="h-[525px] mt-auto col-span-2 rounded-xl transition-all shadow-lg hover:shadow-xl">
      <div className="flex flex-col gap-4">
        <h3 className="p-6 text-slate-700 text-center font-bold text-2xl">
          #1 预订酒店
        </h3>
        <div>
          <Image
            src={listing?.imageUrls[0]}
            className="object-cover"
            width="420"
            height="300"
            blurDataURL={blurDataURL || undefined} // Pass the blurDataURL only if it exists
            placeholder={blurDataURL ? 'blur' : undefined} // Use blur placeholder only if blurDataURL is available
            alt={listing?.name || '酒店图片'}
          />
          <div className="p-6 flex flex-col gap-8">
            <h3 className="mt-4 font-bold text-slate-700 text-2xl">
              {listing?.name}
            </h3>
            <span className="flex items-center font-semibold gap-2">
              <h3 className="text-slate-500">预订总数：</h3>
              <span className="text-slate-500">
                {listing?.reservations?.length} 预订
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigWidget;

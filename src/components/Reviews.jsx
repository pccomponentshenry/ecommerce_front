import React from "react";
import R from "../styles/Reviews.module.css";
import ReviewCard from "../components/ReviewCard";

export default function Reviews() {
  const reviews = [
    {
      profilePic: [
        "https://www.cronica.com.ar/__export/1653704488065/sites/cronica/img/2022/05/27/ricardo_fort_3_crop1653704384472.jpg_530079780.jpg",
      ],
      name: "Mariano Martinez",
      review: "Llegó todo bien, el producto es muy bueno",
    },
    {
      profilePic: [
        "https://previews.123rf.com/images/leventegyori/leventegyori1506/leventegyori150600386/41665163-sonriendo-feliz-retrato-se%C3%B1ora-mayor.jpg",
      ],
      name: "Pepita Josefa",
      review:
        "El producto dejó mucho que desear porque adpPODSKP jdoij iaojd ijaojsdoj aosjidoij asjojsa oisjodjasjd ojosjdoa oijsoasjdo ",
    },
    {
      profilePic: [
        "https://www.cronica.com.ar/__export/1653704488065/sites/cronica/img/2022/05/27/ricardo_fort_3_crop1653704384472.jpg_530079780.jpg",
      ],
      name: "Mariano Martinez",
      review: "Llegó todo bien, el producto es muy bueno",
    },
    {
      profilePic: [
        "https://previews.123rf.com/images/leventegyori/leventegyori1506/leventegyori150600386/41665163-sonriendo-feliz-retrato-se%C3%B1ora-mayor.jpg",
      ],
      name: "Pepita Josefa",
      review:
        "El producto dejó mucho que desear porque adpPODSKP jdoij iaojd ijaojsdoj aosjidoij asjojsa oisjodjasjd ojosjdoa oijsoasjdo ",
    },
    {
      profilePic: [
        "https://www.cronica.com.ar/__export/1653704488065/sites/cronica/img/2022/05/27/ricardo_fort_3_crop1653704384472.jpg_530079780.jpg",
      ],
      name: "Mariano Martinez",
      review: "Llegó todo bien, el producto es muy bueno",
    },
    {
      profilePic: [
        "https://previews.123rf.com/images/leventegyori/leventegyori1506/leventegyori150600386/41665163-sonriendo-feliz-retrato-se%C3%B1ora-mayor.jpg",
      ],
      name: "Pepita Josefa",
      review:
        "El producto dejó mucho que desear porque adpPODSKP jdoij iaojd ijaojsdoj aosjidoij asjojsa oisjodjasjd ojosjdoa oijsoasjdo ",
    },
    {
      profilePic: [
        "https://www.cronica.com.ar/__export/1653704488065/sites/cronica/img/2022/05/27/ricardo_fort_3_crop1653704384472.jpg_530079780.jpg",
      ],
      name: "Mariano Martinez",
      review: "Llegó todo bien, el producto es muy bueno",
    },
    {
      profilePic: [
        "https://previews.123rf.com/images/leventegyori/leventegyori1506/leventegyori150600386/41665163-sonriendo-feliz-retrato-se%C3%B1ora-mayor.jpg",
      ],
      name: "Pepita Josefa",
      review:
        "El producto dejó mucho que desear porque adpPODSKP jdoij iaojd ijaojsdoj aosjidoij asjojsa oisjodjasjd ojosjdoa oijsoasjdo ",
    },
  ];
  return (
    <>
      <div className={R.reviews}>
        <h6>Reviews</h6>
        <div className={R.container}>
          {reviews.length > 0 &&
            reviews.map((el, i) => (
              <ReviewCard
                name={reviews[i].name}
                profilePic={reviews[i].profilePic}
                review={reviews[i].review}
              />
            ))}
        </div>
      </div>
    </>
  );
}

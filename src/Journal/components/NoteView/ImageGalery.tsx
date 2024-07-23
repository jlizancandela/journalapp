import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useAppSelector } from "../../../store";

export const ImageGalery = () => {
  const { active } = useAppSelector((state) => state.journal);

  const itemdata = active?.imageUrls;

  const url = itemdata
    ? itemdata.map((url) => {
        return {
          img: url,
          title: url,
        };
      })
    : [];

  return (
    <ImageList cols={4} sx={{ width: "100%" }}>
      {url.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?fit=crop&auto=format&dpr=1&w=300`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

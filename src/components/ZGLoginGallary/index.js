import Box from "@mui/material/Box";

export const ZGLoginGallary = () => {
    return (
        <Box sx={{
            height: "100%", width: "100%", backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
                t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
        }} />
    );
}
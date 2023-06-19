import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

export default function Dashboard() {
  return (
    <div style={{ marginTop: "20px", marginLeft: "20px" }}>
      <Card
        variant="outlined"
        orientation="horizontal"
        sx={{
          width: 320,
          "&:hover": {
            boxShadow: "md",
            borderColor: "neutral.outlinedHoverBorder",
          },
        }}
      >
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img
            src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
            Total users
          </Typography>
          {/* <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: "text.tertiary" }}
          >
            California, USA
          </Link>
        </Typography> */}
          <Chip
            className="elementstyle_inn"
            style={{ width: "60%", alignContent: "center" }}
            variant="outlined"
            color="primary"
            // size="sm"
            sx={{ pointerEvents: "none" }}
          >
            <apan className="elementstyle_span">100</apan>
          </Chip>
        </CardContent>
      </Card>
    </div>
  );
}

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Custombutton({name})
{
    return (
        <Button
        disableElevation
        disableRipple
        sx={{
          mx: 1,
          position: "relative",
          "&:hover": { 
            backgroundColor: "transparent", 
            "& .underline": {
              borderBottom: "2px solid black"
            },
          },
        }}
      >
        <Typography
          variant="button"
          component="span"
          className="underline"
          sx={{
            fontFamily: "monospace",
            fontWeight: 100,
            letterSpacing: ".01rem",
            color: "black",
            
          }}
        >
          {name}
        </Typography>
        </Button>
    )
}

export default Custombutton;
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
            fontWeight: 700,
            fontSize: 'large',
            letterSpacing: ".01rem",
            color: "rgb(66,137,52)",
            
          }}
        >
          {name}
        </Typography>
        </Button>
    )
}

export default Custombutton;
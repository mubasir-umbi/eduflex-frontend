import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import Typography from '../components/Typography';
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RegistrationForm from "../tutor/RegistrationForm";

function Hero2() {
  return (
    <>
      <Container
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 9,
        }}
      >
        <Accordion sx={{ width: "md" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Button
              sx={{
                border: "4px solid currentColor",
                borderRadius: 0,
                height: "auto",
                py: 2,
                px: 5,
              }}
            >
              <Typography variant="h4" component="span">
                Want to teach on EduFlex? Register Here?
              </Typography>
            </Button>
          </AccordionSummary>
          <AccordionDetails>
            <RegistrationForm />
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
}

export default Hero2;

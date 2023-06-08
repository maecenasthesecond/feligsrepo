import React, { useEffect, useState } from "react";
import "./App.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { shuffleArray } from "./utils/shufflearray";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import drawerImage from "./assets/background.jpg";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [agentsData, setAgentsData] = useState([]);
  const [newAgent, setNewAgent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAgent, setCurrentAgent] = useState({});
  const [agentsChoice, setAgentsChoice] = useState([]);
  const [open, setOpen] = React.useState(false);
  const apiUrl =
    "https://valorant-api.com/v1/agents?language=de-DE&isPlayableCharacter=true";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        setAgentsData(data.data);
        setIsLoading(false);
        setNewAgent(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!newAgent) {
      return;
    }

    if (isLoading) {
      return;
    }

    const index = Math.floor(Math.random() * agentsData.length);
    const pickedAgent = agentsData.at(index);

    let agentNameArray = [];

    while (agentNameArray.length < 3) {
      const tempIndex = Math.floor(Math.random() * agentsData.length);
      if (
        !agentNameArray.includes(agentsData[tempIndex].displayName) &&
        agentsData[tempIndex].displayName !== pickedAgent.displayName
      ) {
        agentNameArray.push(agentsData[tempIndex].displayName);
      }
    }

    agentNameArray.push(pickedAgent.displayName);
    setAgentsChoice(shuffleArray(agentNameArray));
    setCurrentAgent(pickedAgent);
    setNewAgent(false);
  }, [newAgent]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const checkIfRight = (agent) => {
    if (agent === currentAgent.displayName) {
      handleClick();
      setNewAgent(true);
    } else {
      console.log("You are wrong!");
    }
  };

  return (
    <Box
      sx={{
        background: `url(${drawerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "darken",
      }}
    >
      <Box
        display="flex"
        sx={{
          height: "100vh",
          width: "100vw",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Du hast den richtigen Agenten erraten!
          </Alert>
        </Snackbar>
        <Box>
          <Typography
            variant="h1"
            sx={{
              color: "#364966",
              textShadow: "#FFF 1px 0 10px;",
            }}
          >
            Guess the Agent
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              maxWidth: "800px",
              maxHeight: "800px",
              filter: "blur(0.2rem)",
            }}
          >
            <img
              src={currentAgent.bustPortrait}
              alt="Portrait of a valorant agent"
            />
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: "10px", sm: "20px" },
            }}
          >
            {agentsChoice.map((agent) => {
              return (
                <Button
                  variant="contained"
                  color="primary"
                  key={agent}
                  onClick={() => {
                    checkIfRight(agent);
                  }}
                  size="large"
                  sx={{
                    width: "200px",
                  }}
                >
                  {agent}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;

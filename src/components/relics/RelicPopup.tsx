import * as React from "react"

// Component imports
import { TabPanel, StyledTabs, StyledTab } from "../_custom/CustomTabs"

// MUI imports
import { useTheme, useMediaQuery, Box, AppBar, Typography, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

// Helper imports
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

// Type imports
import { Relic } from "../../types/relic/relic"

interface RelicPopupProps {
    relic: Relic
    functions: (() => void)[]
}

function RelicPopup({ relic, functions }: RelicPopupProps) {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.up("sm"))

    let { name, rarity, setEffect, pieces } = relic

    let handleClose = functions[0]

    const pieceIconStyle: React.CSSProperties = {
        width: "48px",
        height: "48px",
        padding: "6px",
        border: `2px solid ${theme.border.color}`,
        borderRadius: "5px",
    }

    const artifactImageStyle: React.CSSProperties = {
        width: "128px",
        height: "128px",
        border: `2px solid ${theme.border.color}`,
        borderRadius: "15px",
        padding: "10px",
        marginBottom: "20px",
        backgroundColor: theme.materialImage.backgroundColor,
        backgroundImage: `url(${process.env.REACT_APP_URL}/backgrounds/Background_${rarity}_Star.png)`,
        backgroundSize: "100%",
        backgroundPosition: "center"
    }

    const [tabValue, setTabValue] = React.useState(0)
    const handleTabChange = (event: React.BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    return (
        <Box
            sx={{
                width: { xs: "100%", md: "50vw" },
                minHeight: { xs: "100vh", sm: "30vw" },
                overflowY: "auto",
                backgroundColor: `${theme.paper.backgroundColor}`,
                border: { xs: "none", sm: `2px solid ${theme.border.color}` },
                borderRadius: { xs: "0px", sm: "5px" },
            }}
        >
            <AppBar position="static"
                sx={{
                    backgroundColor: theme.appbar.backgroundColor,
                    borderBottom: `1px solid ${theme.border.color}`,
                    borderRadius: "5px 5px 0px 0px",
                    pr: 1
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography
                        sx={{
                            fontFamily: `${theme.font.styled.family}`,
                            fontSize: matches ? "28px" : "24px",
                            color: `${theme.text.color}`,
                            p: 2
                        }}
                    >
                        {relic.displayName ? relic.displayName : name}
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: `white` }} />
                    </IconButton>
                </Box>
            </AppBar>
            <Box>
                <StyledTabs
                    variant="scrollable"
                    value={tabValue}
                    onChange={handleTabChange}
                    scrollButtons={!matches}
                    allowScrollButtonsMobile={!matches}
                    sx={{
                        backgroundColor: matches ? "none" : `${theme.table.header.backgroundColor}`,
                        "& .MuiTabScrollButton-root": {
                            color: `${theme.text.color}`,
                        },
                    }}
                >
                    {
                        pieces.map((piece: { name: string, type: string }, index: number) =>
                            <StyledTab
                                key={index}
                                label={
                                    <img
                                        src={`${process.env.REACT_APP_URL}/relics/icons/${piece.type}.png`}
                                        style={pieceIconStyle}
                                        alt={piece.name}
                                        onError={ErrorLoadingImage}
                                    />}
                            />
                        )}
                </StyledTabs>
            </Box>
            {
                pieces.map((piece: { name: string, type: string, description: string }, index: number) => (
                    <TabPanel key={index} index={index} value={tabValue}>
                        <Typography
                            sx={{
                                fontFamily: `${theme.font.styled.family}`,
                                fontSize: { xs: "20px", sm: "24px" },
                                color: `${theme.text.color}`
                            }}
                        >
                            {piece.name}
                        </Typography>
                        <img src={`https://i.imgur.com/7uUH82t.jpeg`}
                            alt={piece.name}
                            style={artifactImageStyle}
                            onError={ErrorLoadingImage}
                        />
                    </TabPanel>
                ))
            }
        </Box>
    )

}

export default RelicPopup

function formatPieceType(type: string) {
    switch (type) {
        case "head":
            type = "الخوذة"
            break
        case "hand":
            type = "القفازات"
            break
        case "body":
            type = "الصدر"
            break
        case "feet":
            type = "الأقدام"
            break
        case "orb":
            type = "الكرة"
            break
        case "rope":
            type = "الحبل"
            break
        default:
            break
    }
    return type
}
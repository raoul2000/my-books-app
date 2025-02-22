import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import { Book, TravelTicket } from "@/types";
import { TicketHelp } from "@/component/TicketHelp";

const useStyles = makeStyles((theme) => ({
    boardingButton: {
        marginLeft: "auto",
    },

    ticketMainInfoContainer: {
        backgroundColor: "#fafafa",
        padding: "1em",
        border: "1px dashed black",
        marginBottom: "2em",
    },
    highlightField: {
        borderLeft: "2px solid #d8d8d8",
        paddingLeft: "1em",
    },
    hideOnPrint: {
        display: "flex",
    },
    cutHereText: {
        display: "none",
    },
    [`@media print`]: {
        hideOnPrint: {
            display: "none",
        },
        cutHereText: {
            display: "block",
            position: "relative",
            top: "-25px",
            fontSize: "10px",
            color: "grey",
        },
    },
}));

type Props = {
    ticket: TravelTicket;
    book: Book;
    onDeleteTicket: (ticket: TravelTicket) => void;
    onPreBoarding: (ticket: TravelTicket) => void;
};
export const TicketView: React.FC<Props> = ({
    ticket,
    book,
    onDeleteTicket,
    onPreBoarding,
}): JSX.Element => {
    const classes = useStyles();
    const handleDeleteTicket = () => onDeleteTicket(ticket);
    const handleBoarding = () => onPreBoarding(ticket);
    const handlePrintTicket = () => window.print();

    // set filename with printing to PDF
    document.title = `book-ticket-${ticket.id}`;
    return (
        <>
            {book.isTraveling === true && (
                <Box marginBottom="2em">
                    <Alert severity="info">
                        Ticket Utilisé: ce livre est en voyage...
                    </Alert>
                </Box>
            )}
            <Card elevation={2}>
                <CardHeader
                    avatar={
                        <Avatar>
                            <FlightTakeoffIcon />
                        </Avatar>
                    }
                    title="Ticket De Voyage"
                    subheader={`réservation : ${ticket?.id}`}
                />
                <CardContent>
                    <Box className={classes.ticketMainInfoContainer}>
                        <Grid container spacing={1}>
                            <Grid item sm={6}>
                                Livre voyageur
                                {ticket?.qrCodeUrl && (
                                    <Box>
                                        <img
                                            src={ticket?.qrCodeUrl}
                                            alt="qr code"
                                        />
                                    </Box>
                                )}
                            </Grid>
                            <Grid item sm={6}>
                                <Typography
                                    color="textSecondary"
                                    variant="button"
                                >
                                    Numéro de Réservation
                                </Typography>
                                <Typography variant="h5" gutterBottom={true}>
                                    {ticket?.id}
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    variant="button"
                                >
                                    Checkpoint
                                </Typography>
                                <Typography  gutterBottom={true}>
                                    {ticket.checkpointUrl}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <div className={classes.cutHereText}>
                        découpez suivant les pointillés ou seulement le QR-code
                        - coller sur le livre
                    </div>
                    <Typography color="textSecondary" variant="button">
                        Passager
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        gutterBottom={true}
                        className={classes.highlightField}
                    >
                        <strong>{book?.title}</strong>
                        {book?.author && (
                            <>
                                <br />
                                {book.author}
                            </>
                        )}
                    </Typography>
                    <Typography color="textSecondary" variant="button">
                        Date Départ
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        gutterBottom={true}
                        className={classes.highlightField}
                    >
                        {ticket?.departureDateTime
                            ? `${ticket.departureDateTime.toLocaleDateString()} à ${ticket.departureDateTime
                                  .toLocaleTimeString()
                                  .replace(/:..$/, "")}`
                            : "open"}
                    </Typography>
                    <Typography color="textSecondary" variant="button">
                        Lieu de Départ
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        gutterBottom={true}
                        className={classes.highlightField}
                    >
                        {ticket?.from || "indéfini"}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className={classes.hideOnPrint}>
                    {!book.isTraveling && (
                        <>
                            <IconButton
                                aria-label="share"
                                onClick={handleDeleteTicket}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton
                                aria-label="share"
                                onClick={handlePrintTicket}
                            >
                                <PrintIcon />
                            </IconButton>
                            <Button
                                className={classes.boardingButton}
                                color="primary"
                                variant="contained"
                                size="small"
                                onClick={handleBoarding}
                            >
                                Embarquement
                            </Button>
                        </>
                    )}
                </CardActions>
            </Card>
            <TicketHelp />
        </>
    );
};

import React from "react";
import Button from "@material-ui/core/Button";

import { Book } from "@/types";
import { TicketHelp } from "@/component/TicketHelp";

type Props = {
    onCreateTicket: () => void;
};

export const TicketNotFoundView: React.FC<Props> = ({
    onCreateTicket,
}): JSX.Element => {
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onCreateTicket}
            >
                Créer Ticket
            </Button>
            <TicketHelp />
        </>
    );
};

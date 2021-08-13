import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useLocation } from "wouter";
import { useSetRecoilState, useRecoilState } from "recoil";
import { booksState } from "../state/books";
import { progressState } from "../state/progress";
import { Book } from "../types";
import { FormBook2 } from "../component/FormBook2";
import BookApi from "../api/book";
import Container from "@material-ui/core/Container";
import { TopBarActions } from "@/component/TopBarActions";
import { bookFormState } from "@/state/book-form";
import { IsbnScanner } from "@/component/IsbnScanner";
import { FabScanner } from "@/component/button/FabScanner";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        submitButton: {
            color: "white",
        },
    })
);

export const AddBookPage: React.FC<{}> = (): JSX.Element => {
    const classes = useStyles();
    const [enableIsbnScan, setEnableIsbnScan] = useState(false);
    const setBooks = useSetRecoilState<Book[]>(booksState);
    const setProgress = useSetRecoilState(progressState);
    const [bookForm, setBookForm] = useRecoilState(bookFormState);
    const [, setLocation] = useLocation();

    useEffect(() => {
        setBookForm({
            title: "",
            author: "",
            isbn: "",
            validation: {
                title: true,
            },
        });
    }, []);

    const handleSave = () => {
        if (!bookForm.title) {
            alert("please enter a title");
            setBookForm((curState) => ({
                ...curState,
                validation: {
                    ...curState.validation,
                    title: false,
                },
            }));
            return;
        }
        const newBook: Omit<Book, "id"> = {
            title: bookForm.title,
            author: bookForm.author,
            isbn: bookForm.isbn
        };

        setProgress(true);
        setLocation("/");
        BookApi.addBook(newBook)
            .then((savedBook) => {
                console.log(savedBook);
                setBooks((oldBooks) => [savedBook, ...oldBooks]);
            })
            .catch((error) => console.error(error))
            .finally(() => setProgress(false));
    };

    const handleIsbnScanSuccess = (isbn:string) => {
        BookApi.fetchIsbnData(isbn)
            .then((bookData:Book) => {
                setBookForm((curState) => ({
                    ...curState,
                    ...bookData,
                    isbn
                }));
            })
            .finally(() => {
                setEnableIsbnScan(false);
            });
    };

    return (
        <>
            {enableIsbnScan === true ? (
                <IsbnScanner
                    onSuccess={handleIsbnScanSuccess}
                    onError={console.log}
                    onCancel={() => setEnableIsbnScan(false)}
                />
            ) : (
                <div className="about">
                    <TopBarActions
                        showBack={true}
                        backPath={"/"}
                        actions={
                            <Button
                                className={classes.submitButton}
                                onClick={handleSave}
                            >
                                Enregistrer
                            </Button>
                        }
                    />
                    <main>
                        <Container maxWidth="sm">
                            <div className="add-book">
                                <Typography variant="h5" component="h1">
                                    Add book
                                </Typography>
                                <FormBook2 />
                            </div>
                        </Container>
                        <FabScanner onClick={() => setEnableIsbnScan(true)} />
                    </main>
                </div>
            )}
        </>
    );
};

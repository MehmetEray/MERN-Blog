import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    TextField,
    Select,
    Input,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createPost } from "../actions/post";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
}));

const postSchema = yup.object().shape({
    title: yup.string().required(),
    subtitle: yup.string().required(),
    content: yup.string().min(5).required(),
});

const AddPostForm = ({ open, handleClose }) => {
    const dispatch = useDispatch();

    const [file, setFile] = useState(null);
    const { register, handleSubmit, control, reset } = useForm({
        resolver: yupResolver(postSchema),
    });

    const onSubmit = (data) => {
        console.log({ ...data, image: file });
        dispatch(createPost({ ...data, image: file }));
        clearForm();
    };

    const clearForm = () => {
        reset();
        setFile(null);
        handleClose();
    };

    const classes = useStyles();
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle> Yeni Yazı Oluştur</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
                </DialogContentText>
                <div className={classes.root}>
                    <form
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextField
                            id="title"
                            label="Başlık"
                            name="title"
                            variant="outlined"
                            className={classes.textField}
                            size="small"
                            {...register("test", { required: true })}
                            fullWidth
                        />
                        <TextField
                            id="subtitle"
                            label="Alt Başlık"
                            name="subtitle"
                            variant="outlined"
                            className={classes.textField}
                            size="small"
                            {...register("test", { required: true })}
                            fullWidth
                        />

                        <TextField
                            id="content"
                            label="İçerik"
                            name="content"
                            multiline
                            size="small"
                            {...register("test", { required: true })}
                            rows={4}
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                        />

                        <FileBase64
                            multiple={false}
                            onDone={({ base64 }) => setFile(base64)}
                        />
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={clearForm} color="inherit">
                    Vazgeç
                </Button>
                <Button
                    type="submit"
                    onClick={() => onSubmit()}
                    color="primary"
                    variant="outlined"
                >
                    Yayınla
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPostForm;

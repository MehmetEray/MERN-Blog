import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updatePost } from "../actions/post";

const useStyles = makeStyles((theme) => ({
    textField: {
        marginBottom: theme.spacing(2),
    },
    buttons: {
        marginTop: theme.spacing(2),
    },
}));

const postSchema = yup.object().shape({
    title: yup.string().required(),
    subtitle: yup.string().required(),
    content: yup.string().min(20).required(),
});

const EditPostForm = ({ history, post, closeEditMode }) => {
    const dispatch = useDispatch();

    const [file, setFile] = useState(post?.image);
    const { register, handleSubmit, reset } = useForm({
        resolver: yupResolver(postSchema),
    });

    const onSubmit = (data) => {
        const updatedPost = {
            _id: post._id,
            ...data,
            image: file,
        };
        dispatch(updatePost(post._id, updatedPost));

        reset();
        setFile(null);
        closeEditMode();
    };

    const classes = useStyles();
    return (
        <div>
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
                    {...register("title", { required: true })}
                    fullWidth
                    defaultValue={post?.title}
                />
                <TextField
                    id="subtitle"
                    label="Alt Başlık"
                    name="subtitle"
                    variant="outlined"
                    className={classes.textField}
                    size="small"
                    {...register("subtitle", { required: true })}
                    fullWidth
                    defaultValue={post?.subtitle}
                />

                <TextField
                    id="content"
                    label="İçerik"
                    name="content"
                    multiline
                    size="small"
                    {...register("content", { required: true })}
                    rows={4}
                    className={classes.textField}
                    variant="outlined"
                    fullWidth
                    defaultValue={post?.content}
                />
                <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => setFile(base64)}
                />
                <div className={classes.buttons}>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={closeEditMode}
                    >
                        Vazgeç
                    </Button>{" "}
                    <Button color="secondary" variant="outlined" type="submit">
                        Kaydet
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditPostForm;

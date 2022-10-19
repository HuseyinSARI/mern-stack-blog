import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from "@mui/material"
import { truncateString } from '../middleware/utilities';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(() => ({
    backgroundColor: "silver",
    borderRadius: 10,
}));

export default function BlogCard(props) {
    const navigate = useNavigate();
    return (
        <Card variant="shaded">
            <CardContent>
                <Typography variant='h6' >
                    {props.blog.title}
                </Typography>
                <Typography color="text.secondary" >
                    {truncateString(props.blog.content,150) }
                </Typography>
            </CardContent>
            <CardActions >
                <Button align="right" size="small" onClick={() => navigate("/blogs/" + props.blog._id)}>
                    Read More
                </Button>
            </CardActions>
        </Card>
    );
}

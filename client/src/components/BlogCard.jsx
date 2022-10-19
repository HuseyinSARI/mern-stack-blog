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
        <StyledCard >
            <CardContent>
                <Typography variant='h6' align='left'>
                    {props.blog.title}
                </Typography>
                <Typography color="text.secondary" align='left'>
                    {truncateString(props.blog.content, 100)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate("/blogs/" + props.blog._id)}>
                    Read More
                </Button>
            </CardActions>
        </StyledCard>
    );
}

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useBlog } from "../middleware/contextHooks"
import { Transition } from "react-transition-group"
import { LoremIpsum } from "lorem-ipsum"
import { toast } from "react-toastify";
import { gsap } from "gsap"

import {
  Grid, Slider, TextField, Container,
  Button, Paper, Stack, Typography,
  FormControlLabel, Checkbox
} from "@mui/material"

// #region ------------ [ Components ] ------------
import MainContainer from "../components/MainContainer"
// #endregion

function NewBlog() {
  const navigate = useNavigate();
  const [onGenerate, setOnGenerate] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const { toasts, clearErrors, createBlog, blogs, getBlogs } = useBlog();

  useEffect(() => {

    if (!blogs) {
      getBlogs();
    }

    if (toasts) {
      toasts.forEach(element => {
        toast(element.message, { type: element.type })
      });

      clearErrors();
    }
  }, [toasts, clearErrors, blogs, getBlogs])


  const handleSave = () => {
    if (newBlog.title.length > 0 && newBlog.content.length > 0) {
      createBlog(newBlog)
    } else {
      toast("Please provide blog title and content", { type: "error" });
    }
  }

  const [loremOptions, setLoremOptions] = useState({
    minWordPerSentence: 3,
    maxWordPerSentence: 16,
    wordPerSentence: 4,

    minSentencePerParagraph: 4,
    maxSentencePerParagraph: 20,
    sentencePerParagraph: 5,

    minParaphPerBlog: 2,
    maxParaphPerBlog: 10,
    paragraphPerBlog: 3,
  })

  const handleGenerate = () => {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: loremOptions.sentencePerParagraph,
        min: loremOptions.minSentencePerParagraph,
      },
      wordsPerSentence: {
        max: loremOptions.wordPerSentence,
        min: loremOptions.minWordPerSentence,
      }
    })

    setNewBlog({
      title: lorem.generateSentences(1),
      content: lorem.generateParagraphs(loremOptions.paragraphPerBlog)
    })
  }

  return (
    <MainContainer>
      <Container maxWidth="md" sx={{ py: 2, my: 1, backgroundColor: "#B8E8FC" }} component={Paper}>
        <Grid container spacing={2}>
          <Grid item>
            <FormControlLabel align="left"
              control={
                <Checkbox
                  checked={onGenerate}
                  onChange={() => setOnGenerate(!onGenerate)}
                />
              } label="Auto Generate"
            />
          </Grid>
          <Transition
            timeout={1000} in={onGenerate} mountOnEnter unmountOnExit
            onEntering={(node) => {
              gsap.from(node, {
                y: -50,
                autoAlpha: onGenerate ? 0 : 1,
                duration: 0.5
              })
            }}
            addEndListener={(node, done) => {
              gsap.to(node, {
                y: onGenerate ? 0 : -50,
                autoAlpha: onGenerate ? 1 : 0,
                onComplete: done
              })
            }}
          >
            <Grid item xs={12} container spacing={4} >
              <Grid item xs={12} lg={4}>
                <Typography>Words Per Sentence</Typography>
                <Slider
                  marks={[
                    {
                      value: loremOptions.minWordPerSentence,
                      label: loremOptions.minWordPerSentence,
                    }, {
                      value: loremOptions.maxWordPerSentence,
                      label: loremOptions.maxWordPerSentence,
                    }
                  ]}
                  valueLabelDisplay="auto"
                  min={loremOptions.minWordPerSentence}
                  max={loremOptions.maxWordPerSentence}
                  value={loremOptions.wordPerSentence}
                  onChange={(e, value) => setLoremOptions({
                    ...loremOptions,
                    wordPerSentence: value
                  })}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Typography>Sentences Per Paragraph</Typography>
                <Slider
                  marks={[
                    {
                      value: loremOptions.minSentencePerParagraph,
                      label: loremOptions.minSentencePerParagraph,
                    }, {
                      value: loremOptions.maxSentencePerParagraph,
                      label: loremOptions.maxSentencePerParagraph,
                    }
                  ]}
                  valueLabelDisplay="auto"
                  min={loremOptions.minSentencePerParagraph}
                  max={loremOptions.maxSentencePerParagraph}
                  value={loremOptions.sentencePerParagraph}
                  onChange={(e, value) => setLoremOptions({
                    ...loremOptions,
                    sentencePerParagraph: value
                  })}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Typography>Paragraph Per Blog</Typography>
                <Slider
                  marks={[
                    {
                      value: loremOptions.minParaphPerBlog,
                      label: loremOptions.minParaphPerBlog,
                    }, {
                      value: loremOptions.maxParaphPerBlog,
                      label: loremOptions.maxParaphPerBlog,
                    }
                  ]}
                  valueLabelDisplay="auto"
                  min={loremOptions.minParaphPerBlog}
                  max={loremOptions.maxParaphPerBlog}
                  value={loremOptions.paragraphPerBlog}
                  onChange={(e, value) => setLoremOptions({
                    ...loremOptions,
                    paragraphPerBlog: value
                  })}
                />
              </Grid>
              <Grid item>
                <Button fullWidth={false} onClick={handleGenerate}>Generate Blog</Button>
              </Grid>
            </Grid>
          </Transition>

          <Grid item xs={12}>
            <TextField
              label='Title' value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Content' value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              multiline minRows={5} maxRows={20}
            />
          </Grid>
          <Grid item>
            <Stack spacing={2} direction="row">
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outlined" onClick={e => setNewBlog({ title: "", content: "" })}>Clear</Button>
              <Button onClick={() => navigate("/blogs")}>Cancel</Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  )
}

export default NewBlog
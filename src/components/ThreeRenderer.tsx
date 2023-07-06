import { Fullscreen, Pause, PlayArrow } from "@mui/icons-material";
import { Backdrop, Box, Fab, Stack } from "@mui/material";
import React, { useEffect, useRef } from "react";

type ProjectController = {
  animate: VoidFunction,
  onCanvasResize: VoidFunction,
  pause: VoidFunction,
  play: VoidFunction,
}
export type ThreeJsCode = {
  fullscreen?: boolean,
  setup: (el: HTMLDivElement) => ProjectController
}

const ThreeRenderer: React.FC<ThreeJsCode> = (props) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [fs, setFs] = React.useState(!!props.fullscreen)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [project, setProject] = React.useState<ProjectController | null>(null)

  useEffect(() => {
    if (!project && isPlaying && mountRef.current) {
      mountRef.current.firstChild?.remove()
      let project = props.setup(mountRef.current)
      project.animate()
      setProject(project)
    }
    if (isPlaying && project) {
      project.play()
    }
    if (!isPlaying && project) {
      project.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (isPlaying && project) {
      project.onCanvasResize()
    }
  }, [fs])

  return (
    <Box
      sx={{
        position: fs ? "fixed" : "relative",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: fs ? 'auto' : 400,
        bgcolor: 'common.black',
        borderRadius: fs ? 0 : 4,
        overflow: 'hidden',
        my: fs ? 0 : 3
      }}
    >
      <Box ref={mountRef} sx={{ width: 1, height: 1 }} />
      <Backdrop open={!isPlaying} sx={{ position: 'absolute' }} />
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: fs ? "fixed" : "absolute",
          bottom: theme => theme.spacing(3),
          right: theme => theme.spacing(3),
        }}
      >
        <Fab onClick={() => setIsPlaying(!isPlaying)} size="large">
          {isPlaying ? <Pause /> : <PlayArrow />}
        </Fab>
        <Fab onClick={() => setFs(!fs)} size="large">
          <Fullscreen />
        </Fab>
      </Stack>
    </Box>
  )
}

export default ThreeRenderer;
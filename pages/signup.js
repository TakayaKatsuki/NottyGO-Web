import React, { useState } from "react"
import { useRouter } from "next/router"
import * as mui from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useSignup } from "../src/hooks/useAuth"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { success, error ,signup } = useSignup()
  const router = useRouter()

  //Submit(EnterKey or Button push)
  const handleSubmit = (event) => {
    event.preventDefault()
    signup(email, password)
  }
  
  // ユーザー登録成功時
  if (success) {
    setTimeout(() => {
      //メインページへ遷移
      void router.push("/")
    }, 1500) //1.5秒 delay
  }

  return (
    <mui.Container component="main" maxWidth="xs">
      <mui.CssBaseline />
      <mui.Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <mui.Avatar sx={{ m: 1, bgcolor: "success.main" }}>
          <LockOutlinedIcon />
        </mui.Avatar>
        <mui.Typography component="h1" variant="h5">
          ユーザー登録
        </mui.Typography>
        <mui.Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <mui.TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <mui.TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText="6文字以上の英数字"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <mui.Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "success.main" }}
          >
            ユーザー登録
          </mui.Button>
          <mui.Grid container sx={{ justifyContent: "center" }}>
            <mui.Grid item>
              <mui.Link href="login" variant="p">
                ログインはこちら
              </mui.Link>
            </mui.Grid>
          </mui.Grid>
          {
            error && !success && <mui.Alert severity="error">ユーザー登録に失敗しました</mui.Alert>
          }
          {
            success && !error && <mui.Alert severity="success">ユーザー登録しました</mui.Alert>
          }
        </mui.Box>
      </mui.Box>
    </mui.Container>
  )
}
export default Signup

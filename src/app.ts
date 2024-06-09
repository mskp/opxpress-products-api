import CORS from "cors";
import { default as Express } from "express";
import rateLimit from "express-rate-limit";
import productRouter from "./route/product.route.js";

const app = Express();
const PORT = process.env.PORT ?? 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(Express.json());
app.use(
  CORS({
    origin: "*",
  })
);

const globalRouter = Express.Router();

app.use("/api", globalRouter);

globalRouter.use(productRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;

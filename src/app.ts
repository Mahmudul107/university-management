import express, {
  Application,
  Request,
  Response,
} from "express";
import cors from "cors";
import { StudentRoutes } from "./modules/student/student.route";
import { UserRoutes } from "./modules/user/user.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFoundRoute";
import router from "./app/routes";

const app: Application = express();
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);
// app.use("/api/v1", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

// Not found routes
app.use(notFound)

export default app;

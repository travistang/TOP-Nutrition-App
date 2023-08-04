import { withErrorBoundary } from "@sentry/react";
import Drawer from "../components/Drawer";
import {
  DrawerContent,
  MainContent,
} from "../components/Drawer/DrawerContainer";
import ConsumptionSummary from "./ConsumptionSummary";
import FoodStockDetailPage from "./FoodStockDetailPage";

function MainPage() {
  return (
    <Drawer>
      <DrawerContent>
        <FoodStockDetailPage />
      </DrawerContent>
      <MainContent className="w-[calc(100vw-16px)] overflow-y-auto">
        <ConsumptionSummary />
      </MainContent>
    </Drawer>
  );
}

export default withErrorBoundary(MainPage, {
  beforeCapture: (scope) => {
    scope.setTag("component", "MainPage");
  },
});

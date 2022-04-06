import ChargingStation from "../../images/charging-station.png";
import Conveyer from "../../images/conveyer.png";
import DockDoors from "../../images/dock-doors.png";
import Office from "../../images/office.png";
import OutboundArea from "../../images/outbound-area.png";
import StagingArea from "../../images/staging-area.png";
import useImage from "use-image";

export const ChargingStationImage = () => {
    const [image] = useImage(ChargingStation);
    console.log(image);
    return image;
};

export const ConveyerImage = () => {
    const [image] = useImage(Conveyer);
    return image;
};

export const DockDoorsImage = () => {
    const [image] = useImage(DockDoors);
    return image;
};

export const OfficeImage = () => {
    const [image] = useImage(Office);
    return image;
};

export const OutboundAreaImage = () => {
    const [image] = useImage(OutboundArea);
    return image;
};

export const StagingAreaImage = () => {
    const [image] = useImage(StagingArea);
    return image;
};

import appConfig from "./appConfig";

class EnvironmentSwitcher {
    environment = appConfig.environment;

    getEnvironment = () =>{
        return this.environment;
    }
}

const environmentSwitcer = new EnvironmentSwitcher();
export default environmentSwitcer;

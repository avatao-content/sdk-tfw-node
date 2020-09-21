import { Utilities } from './Utilities';
import { DeployEventHandlerCustom } from './eventhandling/DeployEventHandlerCustom';

/** Triggering TFW events */
/*
let util = new Utilities();
util.setReloadSite(true);
util.setDocumentTitle("JENŐ")
util.switchLayout("ide-only");
util.setHideMessages(true);
util.setIframeURL("/test");
util.setShowUrlBar(false);
util.switchToConsole();
util.switchToTerminal();
util.setShowDeployButton(false);
util.setDeployButtonText(["1","2","3","4"]);
util.reloadIframe();
util.selectFile("/home/user/workdir/test.txt");
util.writeToFile("/home/user/workdir/test.txt","CONTENT CHANGED");
util.reloadIde();
util.finishDeploy();
util.writeToTerminal("terminal_command");
util.writeToConsole("console_text");
util.readConsole();
util.startProcess("webservice");
util.stopProcess("webservice");
util.restartProcess("webservice");
util.step(1);
util.stepTo(2);
util.sendCustomTFWMessage("customkey",{"custom1":"custom2"});
*/
/** Sending messages */
/*
util.sendMessage("0");
util.queueMessages(["1","2"]);
util.sendMessage("3");
*/

/** TFW messaging examples */
let eh = new DeployEventHandlerCustom()
eh.start()

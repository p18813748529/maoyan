import Tabs from "./tabs/Tabs"
import TabItem from "./tabs/TabItem"
import Header from "./header/Header"
import Content from "./content/Content"
import StatusBtn from "./statusBtn/StatusBtn"
import Iscroll from "./iscroll/Iscroll"
import SelectTab from "./selectTab/SelectTab"

export default {
    install(Vue){
        Vue.component(Tabs.name,Tabs);
        Vue.component(TabItem.name,TabItem);
        Vue.component(Header.name,Header);
        Vue.component(Content.name,Content);
        Vue.component(StatusBtn.name,StatusBtn);
        Vue.component(Iscroll.name,Iscroll);
        Vue.component(SelectTab.name,SelectTab);
    }
}
import Panel from "./Panel.tsx";

const Menu = () => {



    return (
        <Panel className="left-6 top-[80px] w-[216px] max-h-[503px] flex flex-col text-sm py-4">
            <div className="px-6 py-[10px]">目标利率</div>
            <div className="px-6 py-[10px]">底限利率</div>
            <div className="px-6 py-[10px]">营业净收入 (全生命周期)</div>
            <div className="px-6 py-[10px]">EVA (全生命周期)</div>
            <div className="px-6 py-[10px] bg-[#2D73FF] text-[#fff]">RAROC</div>
        </Panel>
    )
}

export default Menu;

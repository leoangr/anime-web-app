import { CardDetailLeft } from "./CardDetailLeft"
import { CardDetailRight } from "./CardDetailRight"

const Detail = () => {

    return(
        <section className="container">
            <div className="box-content">
                <div className="flex flex-col gap-8 w-full mb-[4rem] md:flex-row">
                    <CardDetailLeft />
                    <CardDetailRight />
                </div>
            </div>
        </section>
    )
}

export default Detail
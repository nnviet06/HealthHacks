import './aboutSection.css';

export default function AboutSection() {
    return (
        <div className = "about-section-container">
            <h1>About</h1>
            <div className = "purpose-container">
                <PurposeBox description = "Purpose 1"></PurposeBox>
                <PurposeBox description = "Purpose 2"></PurposeBox>
                <PurposeBox description = "Purpose 3"></PurposeBox>
            </div>
        </div>
    )
}

function PurposeBox(props) {
    return (
        <div className = "purpose-box">
            <img src = {props.image} alt = "purpose-image" />
            <p>{props.description}</p>
        </div>
    )
}
// lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calculate(a: f64, b: f64, operation: &str) -> f64 {
    match operation {
        "+" => a + b,
        "-" => a - b,
        "*" => a * b,
        "/" => {
            if b != 0.0 {
                a / b
            } else {
                f64::NAN
            }
        }
        "%" => a % b,
        _ => f64::NAN,
    }
}

#[wasm_bindgen]
pub fn format_number(num: f64) -> String {
    if num.fract() == 0.0 {
        format!("{:.0}", num)
    } else {
        format!("{:.8}", num)
            .trim_end_matches('0')
            .trim_end_matches('.')
            .to_string()
    }
}

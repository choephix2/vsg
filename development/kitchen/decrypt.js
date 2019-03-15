function decrypt_score( v, params=undefined )
{
  try
  {
    let offset = params[1]
    let character_positions = params[2]
    function at(i) { return v.charAt(character_positions[i]) }
    let s36 = at(1)+at(2)+at(3)+at(4)+at(5)+at(6)
    s36 = s36.replace( new RegExp("[A-Z]+"), '' )
    return parseInt(s36,36)-offset
  } catch(e) { return e }
}

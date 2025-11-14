open System

type Config =
    { Text: string list option
      OmitNewline: bool
      Env: string option }

let parseArgs (argv: string[]) =
    let mutable omitNewline = false
    let mutable envVar = None
    let mutable texts = []

    let rec loop args =
        match args with
        | [] -> ()
        | "-n" :: rest ->
            omitNewline <- true
            loop rest
        | "-e" :: v :: rest ->
            envVar <- Some v
            loop rest
        | "--env" :: v :: rest ->
            envVar <- Some v
            loop rest
        | s :: rest ->
            texts <- texts @ [s]
            loop rest

    loop (argv |> Array.toList)

    let textOpt = if texts.Length > 0 then Some texts else None

    { Text = textOpt; OmitNewline = omitNewline; Env = envVar }

let run config =
    let results = System.Collections.Generic.List<string>()

    match config.Text with
    | Some t -> results.Add(String.concat " " t)
    | None -> ()

    match config.Env with
    | Some name ->
        match Environment.GetEnvironmentVariable(name) with
        | null ->
            eprintfn "err! environment variable not found: %s" name
            Environment.Exit(1)
        | value ->
            let splitter =
                if Environment.OSVersion.Platform = PlatformID.Win32NT then ";" else ":"
            value.Split(splitter) |> Array.iter (fun p -> results.Add(p + "\n"))
    | None -> ()

    results |> Seq.iter (printf "%s")
    if not config.OmitNewline then printfn ""

[<EntryPoint>]
let main argv =
    let cfg = parseArgs argv

    if cfg.Text.IsNone && cfg.Env.IsNone then
        [|
            ""
            "#######      #######      #     #      #######"
            "#            #            #     #      #     #"
            "######       #            #######      #     #"
            "#            #            #     #      #     #"
            "#######      #######      #     #      #######"
            ""
            " << Enter characters or use -e to specify environment variables!"
        |] |> Array.iter (printfn "%s")
        0
    else
        run cfg
        0
